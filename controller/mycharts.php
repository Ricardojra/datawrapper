<?php

function nbChartsByMonth($id, $is_org, $folder_id) {
    $id_clause = ($is_org) ? "organization_id = '".$id."'" : "organization_id is NULL AND author_id = '".$id."'";
    $folder_id = (!is_null($folder_id)) ? "= '".$folder_id."'" : 'is NULL';
    $con = Propel::getConnection();
    $sql = "SELECT DATE_FORMAT(created_at, '%Y-%m') ym, COUNT(*) c FROM chart WHERE ".$id_clause." AND in_folder ".$folder_id." AND deleted = 0 AND last_edit_step >= 2 GROUP BY ym ORDER BY ym DESC ;";
    $rs = $con->query($sql);
    $res = array();
    foreach ($rs as $r) {
        $res[] = array('count' => $r['c'], 'id' => $r['ym'], 'name' => strftime('%B %Y', strtotime($r['ym'].'-01')));
    }
    return $res;
}

function nbChartsByType($id, $is_org, $folder_id) {
    $id_clause = ($is_org) ? "organization_id = '".$id."'" : "organization_id is NULL AND author_id = '".$id."'";
    $folder_id = (!is_null($folder_id)) ? "= '".$folder_id."'" : 'is NULL';
    $con = Propel::getConnection();
    $sql = "SELECT type, COUNT(*) c FROM chart WHERE ".$id_clause." AND in_folder ".$folder_id." AND deleted = 0 AND last_edit_step >= 2 GROUP BY type ORDER BY c DESC ;";
    $rs = $con->query($sql);
    $res = array();

    foreach ($rs as $r) {
        $vis = DatawrapperVisualization::get($r['type']);
        $lang = substr(DatawrapperSession::getLanguage(), 0, 2);
        if (!isset($vis['title'])) continue;
        if (empty($vis['title'][$lang])) $lang = 'en';
        $res[] = array('count' => $r['c'], 'id' => $r['type'], 'name' => $vis['title']);
    }
    return $res;
}

/*function nbChartsByLayout($user) {
    $con = Propel::getConnection();
    $sql = "SELECT theme, COUNT(*) c FROM chart WHERE author_id = ". $user->getId() ." AND deleted = 0 AND last_edit_step >= 2 GROUP BY theme ORDER BY c DESC ;";
    $rs = $con->query($sql);
    $res = array();
    foreach ($rs as $r) {
        $theme = ThemeQuery::create()->findPk($r['theme']);
        if (!$theme) continue; // ignoring charts whose themes have been removed
        $res[] = array('count' => $r['c'], 'id' => $r['theme'], 'name' => $theme->getTitle());
    }
    return $res;
}*/

function nbChartsByStatus($id, $is_org, $folder_id) {
    if ($is_org) {
        $published = ChartQuery::create()->filterByOrganizationId($id);
        $draft = ChartQuery::create()->filterByOrganizationId($id);
    } else {
        $published = ChartQuery::create()->filterByOrganizationId(null)->filterByAuthorId($id);
        $draft = ChartQuery::create()->filterByOrganizationId(null)->filterByAuthorId($id);
    }
    $published = $published->filterByDeleted(false)
        ->filterByLastEditStep(array('min'=>4))
        ->filterByInFolder($folder_id)
        ->count();
    $draft = $draft->filterByDeleted(false)
        ->filterByLastEditStep(3)
        ->filterByInFolder($folder_id)
        ->count();
    return array(
        array('id'=>'published', 'name' => __('Published'), 'count' => $published),
        array('id'=>'draft', 'name' => __('Draft'), 'count' => $draft)
    );
}

function list_organizations($user) {
    $user_id = $user->getId();
    $organizations = UserOrganizationQuery::create()->findByUserId($user_id);
    $orgs = array();
    foreach ($organizations as $user_org) {
        $org = $user_org->getOrganization();
        if (!$org->getDisabled()) {
            $obj = new stdClass();
            $obj->id = $org->getId();
            $obj->name = $org->getName();
            $obj->tag = preg_replace(array('/[^[:alnum:] -]/', '/(\s+|\-+)/'), array('', '-'), $org->getId());
            $orgs[] = $obj;
        }
    }

    uasort($orgs, function($a, $b) {
        if ($a->name == $b->name) return 0;
        return ($a->name < $b->name) ? -1 : 1;
    });

    return $orgs;
}

function mycharts_group_charts($charts_res, $groups) {
    // TODO: group charts
    $out = [];
    // convert Propel Collection to array
    $charts = [];
    foreach ($charts_res as $chart) { $charts[] = $chart; }

    foreach ($groups as $id => $group) {
        $group['id'] = $id;
        if (isset($group['filter'])) {
            $group['charts'] = array_filter($charts, $group['filter']);
            unset($group['filter']);
        }
        $out[] = $group;
    }
    return $out;
}

function mycharts_group_by_month($charts) {
    $groups = [];

    foreach ($charts as $chart) {
        $month = $chart->getLastModifiedAt('Y-m');
        if (!isset($groups[$month])) {
            $groups[$month] = [
                'title' => $month,
                'id' => $month,
                'charts' => []
            ];
        }
        $groups[$month]['charts'][] = $chart;
    }
    return $groups;
}

function mycharts_group_by_type($charts) {
    $groups = [];

    foreach ($charts as $chart) {
        $type = $chart->getType();
        if (!isset($groups[$type])) {
            $groups[$type] = [
                'title' => $type,
                'id' => $type,
                'charts' => []
            ];
        }
        $groups[$type]['charts'][] = $chart;
    }
    return $groups;
}


/*
 * shows MyChart page for a given user (or organization), which is typically the
 * logged user, but admins can view others MyCharts page, too.
 */
function any_charts($app, $user, $folder_id = false, $org_id = false) {
    $curPage = $app->request()->params('page');
    $q = $app->request()->params('q');
    $key = $app->request()->params('key');
    $val = $app->request()->params('val');
    if (empty($curPage)) $curPage = 0;
    $perPage = 48;
    $filter = !(empty($key) || empty($val)) ? array($key => $val) : array();
    if ($folder_id !== false) $filter = array_merge($filter, array('folder' => $folder_id));
    if (!empty($q)) $filter['q'] = $q;
    if ($org_id) {
        $id = $org_id;
        $is_org = true;
    } else {
        $id = $user->getId();
        $is_org = false;
    }
    $charts =  ChartQuery::create()->getPublicChartsById($id, $is_org, $filter, $curPage * $perPage, $perPage, 'lastUpdated');
    $total = ChartQuery::create()->countPublicChartsById($id, $is_org, $filter);
    $serialized_charts = array();

    foreach ($charts as $chart) {
        $chart = $chart->serialize();
        unset($chart['metadata']);
        $serialized_charts[$chart['id']] = $chart;
        unset($serialized_charts[$chart['id']]['id']);
    }

    $groupings = [
        'no-group' => [
            'all' => [
                'title' => '',
                'filter' => function() { return true; }
            ]
        ],
        'status' => [
            'published' => [
                'title' => __('published'),
                'filter' => function($chart) { return $chart->getLastEditStep() > 3; }
            ],
            'draft' => [
                'title' => __('drafts'),
                'filter' => function($chart) { return $chart->getLastEditStep() <= 3; }
            ],
        ],
        'month' => mycharts_group_by_month($charts),
        'type' => mycharts_group_by_type($charts),
    ];

    $group_by = $app->request()->params('group');
    if (empty($group_by)) $group_by = 'no-group';
    $grouped = mycharts_group_charts($charts, $groupings[$group_by]);

    $page = array(
        'title' => __('My Charts'),
        'charts' => $charts,
        'chart_groups' => $grouped,
        'bymonth' => nbChartsByMonth($id, $is_org, $folder_id),
        'byvis' => nbChartsByType($id, $is_org, $folder_id),
        'bystatus' => nbChartsByStatus($id, $is_org, $folder_id),
        'key' => $key,
        'pageClass' => 'dw-mycharts',
        'val' => $val,
        'current' => array(
            'folder' => $folder_id,
            'organization' => $org_id,
            'group' => $app->request()->params('group'),
            'sort' => $app->request()->params('sort'),
        ),
        'search_query' => empty($q) ? '' : $q,
        'mycharts_base' => '/mycharts',
        'organizations' => list_organizations($user),
        'preload' => array(
            'folders' => FolderQuery::create()->getParsableFolders($user),
            'charts' => $serialized_charts,
        ),
    );

    if (DatawrapperSession::getUser()->isAdmin() && $user != DatawrapperSession::getUser()) {
        $page['user2'] = $user;
        $page['mycharts_base'] = '/admin/charts/' . $user->getId();
        $page['all_users'] = UserQuery::create()->filterByDeleted(false)->orderByEmail()->find();
    }

    add_header_vars($page, 'mycharts');
    add_pagination_vars($page, $total, $curPage, $perPage, empty($q) ? '' : '&q='.$q);
    $app->render('mycharts.twig', $page);
}

/*
 * pitfall: folder_id = null → root folder
 * getting all user/organization charts via mycharts/organization is no longer possible
 */
$app->get('/(mycharts|organization/:org_id)(/:folder_id)?/?', function ($org_id = false, $folder_id = null) use ($app) {
    disable_cache($app);
    $user = DatawrapperSession::getUser();
    if (!$user->isLoggedIn()) {
        error_mycharts_need_login();
        return;
    }
    if ($org_id && !$user->isMemberOf($org_id)) {
        error_mycharts_not_a_member();
        return;
    }
    any_charts($app, $user, $folder_id, $org_id);
})->conditions(array('folder_id' => '\d+'));


$app->get('/organization/:org_id/charts', function($org_id) use ($app) {
    $app->redirect('/organization/'.$org_id.'/');
});


$app->get('/admin/charts/:userid/?', function($userid) use ($app) {
    disable_cache($app);
    $user = DatawrapperSession::getUser();
    if ($user->isAdmin()) {
        $user2 = UserQuery::create()->findOneById($userid);
        if ($user2) {
            any_charts($app, $user2);
        } else {
            error_mycharts_user_not_found();
        }
    } else {
        $app->notFound();
    }
})->conditions(array('userid' => '\d+'));
