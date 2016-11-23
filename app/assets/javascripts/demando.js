//= require leaflet

// Leaflet js for the Ecodistrict building selector
$(function () {
    // Initiate all building selector maps on the page
    $('.building-selector').each(function () {
        var questionId = $(this).parents('.q-question').attr('id');
        var buildings = $(this).data('buildings');

        // Create the leaflet map
        buildingSelector.maps[questionId] = L.map($(this)[0], {
            maxZoom: 18
        });

        // Set the tile layer to OSM
        L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        }).addTo(buildingSelector.maps[questionId]);

        // Create geoJSON layer
        buildingSelector.geoJsonLayers[questionId] = L.geoJson($.map(buildings.buildings, function (building) {
                building['type'] = 'Feature';
                building['properties']['questionId'] = questionId;
                return building;
            }),
            {
                style: function (feature) {
                    // Highlight the layer if this building is selected on page load
                    if (feature.properties.id == buildingSelector.getSelectedBuilding(questionId)) {
                        return buildingSelector.highlightedFeatureStyle;
                    }
                    else {
                        return buildingSelector.defaultFeatureStyle;
                    }
                },
                onEachFeature: buildingSelector.onEachFeature
            }
        ).addTo(buildingSelector.maps[questionId]);

        // Zoom & center the map
        buildingSelector.maps[questionId].fitBounds(buildingSelector.geoJsonLayers[questionId]);
    });
});

var buildingSelector = {
    maps: {},
    geoJsonLayers: {},
    highlightedFeatures: {},
    defaultFeatureStyle: {
        color: "#337ab7",
        weight: 2,
        dashArray: ''
    },
    highlightedFeatureStyle: {
        color: "#ff7800",
        weight: 3,
        dashArray: ''
    },
    onEachFeature: function (feature, layer) {
        // Set the layer as highlighted if this building is selected on page load
        if (feature.properties.id == buildingSelector.getSelectedBuilding(feature.properties.questionId)) {
            buildingSelector.highlightedFeatures[feature.properties.questionId] = layer;
        }

        // Bind popup on click
        if (feature.properties.street && (feature.properties.street != '')) {
            layer.bindPopup(feature.properties.street);
        }

        // Bind the click event
        layer.on({
            click: buildingSelector.onClickFeature
        });
    },
    onClickFeature: function (event) {
        var questionId = event.target.feature.properties.questionId;
        var buildingId = event.target.feature.properties.id;

        buildingSelector.setSelectedBuilding(questionId, buildingId);
        buildingSelector.dehighlightAllFeatures(questionId);
        buildingSelector.highlightFeature(questionId, event.target);
    },
    setSelectedBuilding: function (questionId, buildingId) {
        $('#' + questionId).find('input[type=hidden]').first().val(buildingId);
    },
    getSelectedBuilding: function (questionId) {
        return $('#' + questionId).find('input[type=hidden]').first().val();
    },
    highlightFeature: function (questionId, layer) {
        layer.setStyle(buildingSelector.highlightedFeatureStyle);

        if (!L.Browser.ie && !L.Browser.opera) {
            layer.bringToFront();
        }

        buildingSelector.highlightedFeatures[questionId] = layer;
    },
    dehighlightAllFeatures: function (questionId) {
        if (buildingSelector.highlightedFeatures[questionId] != null) {
            buildingSelector.geoJsonLayers[questionId].resetStyle(buildingSelector.highlightedFeatures[questionId]);
            buildingSelector.highlightedFeatures[questionId] = null;
        }
    }
};
