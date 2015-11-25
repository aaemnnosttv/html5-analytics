jQuery(function($) {
    var debug = !! window.trackDebug;
    
    function trackHandler(event) {
        var $el = $(this),
            dataProps = [
                'eventCategory', // data-event-category
                'eventAction',   // data-event-action
                'eventLabel'     // data-event-label
            ],
            data = {
                hitType: 'event',
                eventAction: event.type
            },
            key, prop, ga;
        
        ga = window.ga || window.__gaTracker;
        
        if (debug && 'function' !== typeof ga) {
            console.warn("Can't track this!", ga);
            return;
        }

        for (key in dataProps) {
            prop = dataProps[key];
            data[prop] = $el.data(prop) || data[prop];
        }

        if (debug) {
            console.log('tracking', data);
        }
        
        ga('send', data);
    }
    $(document).on('click', '[track-click],[track-submit]', trackHandler);

});