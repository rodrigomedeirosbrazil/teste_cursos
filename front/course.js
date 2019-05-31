export default {
  name: "Course",
  data () {
    return {
      id: null,
      course: null,
      token: null,
      loading: false,
      isSubscribed: false
    }
  },
  mounted () {
    this.id = this.$route.params.id
    this.token = localStorage.getItem("jwt_token");
    this.getCourse()
  },
  methods: {
    getCourse () {
      this.loading = true
      return axios ({
        method: 'get',
        url: '/api/courses/'+this.id, 
        headers: { 'Authorization': 'Bearer '+this.token }
      })
      .then(response => {
        this.course = response.data.data.course
        this.isSubscribed = response.data.data.isSubscribed
      })
      .catch(error => {
        if(error.response.status == 401) {
          localStorage.removeItem("jwt_token");
          this.$router.push({ path: '/login' })
        }
      })
      .finally( () => this.loading = false) 
    }
  },
  template: `
    <div class="container-fluid">
      <div class="row">
        <div class="col col-md-4">
          <h2 v-if="!course && !loading">Course not exists!</h2>
          <div v-if="loading" class="spinner-border" role="status">
            <span class="sr-only">Loading...</span>
          </div>
          <div class="card" style="width: 18rem;" v-if="course">
            <div class="card-body">
              <h5 class="card-title">{{ course.name }}</h5>
              <p class="card-text">{{ course.description }}</p>
            </div>
            <div class="card-footer text-muted">
              <button class="btn btn-primary" v-if="!isSubscribed">Subscribe</button>
              <span v-if="isSubscribed">You are subscribed!</span>
            </div>
          </div>
        </div>
      </div>
    </div>
    `
};
