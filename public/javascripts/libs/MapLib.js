const _maps = {};

const MapLib = {
    coords: {
        default: {
            getLon: o => o.branch.Coords.lon,
            getLat: o => o.branch.Coords.lat
        }
    },

    draw: (id, data, options) => {
        const coords = options.coords || MapLib.coords.default;
        const features = {
            type: "FeatureCollection",
            features: data.map(o => {
                return {
                    type: "Feature",
                    properties: o,
                    geometry: {
                        type: "Point",
                        coordinates: [coords.getLon(o), coords.getLat(o)]
                    }
                };
            })
        };
        if (_maps[id]) {
            _maps[id].ui.removeLayer(_maps[id].data);
        } else {
            _maps[id] = {};
            _maps[id].bounds = getBounds(features);
            _maps[id].ui = L.map(id).fitBounds(_maps[id].bounds);
            L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
                maxZoom: 18
            }).addTo(_maps[id].ui);
            const reset = $("<a>")
                .attr("href", "#")
                .append(
                    $("<img>").attr("src", "/images/icons/zoom-reset.svg").css("width", "12px")
                );
            reset.on("click", () => {
                _maps[id].ui.flyToBounds(_maps[id].bounds);
                return false;
            });
            $("#" + id)
                .find(".leaflet-control-zoom")
                .append(reset);
        }
        _maps[id].data = L.geoJson(features, {
            onEachFeature: (feature, layer) => {
                if (options.tooltip) {
                    layer.bindPopup(options.tooltip(feature.properties));
                }
            },
            pointToLayer: (feature, latlng) =>
                L.circleMarker(latlng, getIcon(feature.properties, options.marker.color))
        });
        _maps[id].data.addTo(_maps[id].ui);
    },

    center: (id, lat, lon, zoom = 16) => {
        _maps[id].ui.flyTo([lat, lon], zoom);
    }
};

function getBounds(data) {
    const coords = data.features.map(o => o.geometry.coordinates);
    const lons = coords.map(o => o[0]),
        lats = coords.map(o => o[1]);
    const minlat = Math.min(...lats),
        maxlat = Math.max(...lats),
        minlon = Math.min(...lons),
        maxlon = Math.max(...lons);
    return [
        [minlat, minlon],
        [maxlat, maxlon]
    ];
}

function getIcon(data, color) {
    return {
        radius: 4,
        fillColor: color(data),
        color: "transparent",
        weight: 1,
        opacity: 1,
        fillOpacity: 1.0
    };
}
