var NeighborViewModel = function() {
	var self = this;
	// self.neighborList = ko.observableArray(["standford", "others"]);
	self.neighborList = ko.observableArray([]);
    // self.neighborFilter = ko.observableArray([]);
	neighbor_datas.forEach(function(data){
        self.neighborList.push(new Neighbor(data));
        // self.neighborFilter.push(new Neighbor(data));        
	});

    self.filter = ko.observable();
    self.filtNeighbor = ko.computed(function() {
        var filter = self.filter();
        if (!filter) {
            for (var key in marker_dics) {
                if (!marker_dics[key].getMap()) marker_dics[key].setMap(map);
            }
            return self.neighborList();
        } else {
            filter = filter.toLowerCase();
            return ko.utils.arrayFilter(self.neighborList(), function(neighbor) {
                var marker = marker_dics[neighbor.neighbor_id()];
                if (neighbor.name().toLowerCase().indexOf(filter) >= 0) {
                    if (!marker.getMap()) marker.setMap(map);
                    return true;
                }
                if (marker.getMap()) marker.setMap(null);
                return false;
            })
        }
    });

    self.showMarker = function() {
        google.maps.event.trigger(marker_dics[this.neighbor_id()], 'click');
    };
}

var Neighbor = function(data){
    this.neighbor_id = ko.observable(data.neighbor_id);
	this.name = ko.observable(data.name);
	this.address = ko.observable(data.address);
	this.intro = ko.observable(data.intro);
}

var viewModel = new NeighborViewModel();
