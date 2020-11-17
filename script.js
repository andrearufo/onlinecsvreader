var app = new Vue({
	el: '#app',

	data: {
		content: null,
		table: null,
		search: null,
		separator: ','
	},

	computed: {
		list(){
			var list = this.table.body;

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
			//credits: https://stackoverflow.com/a/27979069

			var csv = this.content;
			var lines = csv.split("\n");
			var result = [];

			// NOTE: If your columns contain commas in their values, you'll need
			// to deal with those before doing the next step
			// (you might convert them to &&& or something, then covert them back later)
			// jsfiddle showing the issue https://jsfiddle.net/
			var headers = lines[0].split( this.separator );

			for(var i = 1; i < lines.length; i++){

				var obj = {};
				var currentline = lines[i].split( this.separator );

				for(var j = 0; j < headers.length; j++){
					obj[headers[j]] = currentline[j];
				}

				result.push(obj);

			}

			this.table = {
				head: headers,
				body: result
			};
		}
	}
})
