var app = new Vue({
	el: '#app',

	data: {
		content: null,
		table: null,
		search: null
	},

	computed: {
		list(){
			var list = this.table.data;

			if (this.search) {
				list = _.map(list, function(item){
					var s = JSON.stringify(item).toLowerCase();
					if (s.includes(this.search.toLowerCase())) {
						return item;
					}
				}.bind(this));
			}

			return list;
		}
	},

	methods: {
		loadFile(event) {
			// credits: https://www.digitalocean.com/community/tutorials/vuejs-file-reader-component

			const file = event.target.files[0];
			const reader = new FileReader();

			reader.onload = e => {
				this.content = e.target.result;
			}
			reader.readAsText(file);
		},

		csvToJson(){

			// ref. https://www.papaparse.com/docs
			this.table = Papa.parse(this.content, {
				header: true
			});
		}
	}
})
