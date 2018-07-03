module.exports.types = function() {
    return [
	"2018_spring",
	"2018_swim",
	"2018_yukata",
	"2018_rain",
	"2018_spring",
	"2018_newyear",
	"2017_winter",
	"2017_christmas",
	"2017_halloween",
	"2017_autumn",
	"2017_summer",
	"2017_spring",
	"2017_newyear",
	"2016_christmas",
	"2016_skiing",
	"2016_tachi",
	"2016_halloween",
	"2016_autumn",
	"2016_hiyoko",
	"2016_comic",
	"2016_summer",
	"2016_spring",
	"2016_pop",
	"2015_pop",
	"2015_osc",
	"2015_summer",
	"2015_autumn",
	"2015_xmas",
    ];
}

module.exports.base_url = function() {
    return "http://conoha.mikumo.com/wp-content/themes/conohamikumo/images/wallpaper/";
}

module.exports.image_url = function(type) {
    return this.base_url() + type + "/2560_1440.jpg";
}

module.exports.thumb_url = function(type) {
    return this.base_url() + type + "/thumb.jpg";
}


