export default {
  name: "Courses",
  data () {
    return {
      courses:[]
    }
  },
  mounted () {
    this.cursos = 
        axios
        .get('/api/courses')
        .then(response => this.courses = response.data.data.courses)
        .catch(error => console.log(error))
  },
  template: `
    <div class="container-fluid">
      <div class="row">
        <div class="col col-md-4" v-for="(course, index) in courses" :key="index">
          <div class="card" style="width: 18rem;">
            <div class="card-body">
              <h5 class="card-title">{{ course.name }}</h5>
              <p class="card-text">{{ course.description }}</p>
            </div>
            <div class="card-footer text-muted">
              <a href="#/login" class="btn btn-primary">Subscribe</a>
            </div>
          </div>
        </div>
      </div>
    </div>
    `
};
