jQuery(function($) {
    var debug;

    function log() {
        if (!! window.trackDebug) {
            console.log.apply(console, arguments);
        }
    }

    function warn() {
        if (!! window.trackDebug) {
            console.warn.apply(console, arguments);
        }
    }

    function trackHandler(event) {
        var $el = $(this);
        var dataProps = [
            'eventCategory', // data-event-category
            'eventAction',   // data-event-action
            'eventLabel'     // data-event-label
        ];
        var data = {
            hitType: 'event',
            eventAction: event.type
        };
        var key;
        var prop;
        var ga;

        ga = window.ga || window.__gaTracker;

        if ('function' !== typeof ga) {
            warn("Can't track this!", ga);
            return;
        }

        for (key in dataProps) {
            prop = dataProps[key];
            data[prop] = $el.data(prop) || data[prop];
        }

        log('Tracking', data);

        ga('send', data);
    }

    $(document).on('click', '[track-click],[track-submit]', trackHandler);
});
