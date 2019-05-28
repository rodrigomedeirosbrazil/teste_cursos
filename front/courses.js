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
    <div class="courses-container">
      <h1>Avaliable courses:</h1>
      <ul>
        <li v-for="(course, index) in courses" :key="index" >{{ course.name }}</li> 
      </ul>
    </div>
    `
};
