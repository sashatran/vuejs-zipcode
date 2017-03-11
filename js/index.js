let app = new Vue({
  el: "#app",
  data: {
    city: " ",
    zip: "94301",
    error: ""
  },
  methods: {
    getCity: function() {
      let self = this;
      $.getJSON("https://ZiptasticAPI.com/" + this.zip, function(result) {
        if (result.error) {
          self.error = "zip code not found";
          self.city = "";
          $(".error").addClass("no");
        } else {
          self.city = result.city + "," + result.state;
          $(".display").addClass("animated fadeInDown");
        }
        console.log(result);
      });
    }
  },
  watch: {
    zip: function() {
      if (this.zip.length === 5) {
        this.getCity();
        this.error = "";
        $(".error").removeClass("no");
      }
      if (this.zip.length < 5) {
        this.city = "";
        this.error = "hey, that's not a zipcode";
        $(".error").addClass("no");
         $(".display").removeClass("animated fadeInDown");
      }
    }
  }, 
  mounted: function(){
    this.getCity();
  }
})