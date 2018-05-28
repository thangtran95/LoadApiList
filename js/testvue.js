'use-strict'
$.ajaxSetup({
    headers: { 'Authorization': localStorage.getItem('user_token') }
});
function LoadApi(element){
	var $element = $(element);
	if (!element.length){
		return;
	}

	this.vue = new Vue({
		el: element,
		data: {

			link_api : {
				listUser: $element.data('api-list-user')
			},
			list : {
				data: [],
				loading: false,
				pagination : {
					current_page : 1,
					per_page : 10,
					total : 0,
					last_page : 1,
				}
			}

		},

		methods: {
			testbtn: function(){
				alert('asda')
			},

			load: function(){
				var send_data = {};
				var _this = this;
				_this.list.loading = true;
				$.post(_this.link_api.listUser, send_data, function(res){
					console.log( res );
					if( res.success){
						_this.list.data = res.hasOwnProperty('data') ? res.data.data : [];
						for( var key in _this.list.pagination){
							if( res.data.hasOwnProperty(key)){
								_this.list.pagination[key] = res.data[key];
							}
						}
						_this.list.loading = false;
					}
				})
			}
		},
		created: function(){

		},
		mounted: function(){
			this.load();
		}
	});
	return this;
}
(function(window){
	window.LoadbyApi = new LoadApi('#appVue');
})(window);