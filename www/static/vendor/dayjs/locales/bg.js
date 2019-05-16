export default {
    name: 'bg',
    weekdays: 'Неделя_Понеделник_Вторник_Сряда_Четвъртък_Петък_Събота'.split('_'),
    months: 'Януари_Февруари_Март_Април_Май_Юни_Юли_Август_Септември_Октомври_Ноември_Декември'.split('_'),
    weekStart: 1,
    ordinal: function(n) {
        return n + '.';
    },
    formats: {
        LT: 'H:mm',
        LTS: 'H:mm:ss',
        L: 'D.MM.YYYY',
        LL: 'D MMMM YYYY',
        LLL: 'D MMMM YYYY H:mm',
        LLLL: 'dddd, D MMMM YYYY H:mm'
    },
    relativeTime: {
        future: 'след %s',
        past: 'преди %s',
        s: 'няколко секунди',
        m: 'минута',
        mm: '%d минути',
        h: 'час',
        hh: '%d часа',
        d: 'ден',
        dd: '%d дни',
        M: 'месец',
        MM: '%d месеца',
        y: 'година',
        yy: '%d години'
    }
};
