export default {
  name: "Join",
  data () {
    return {
      name: null,
      email: null,
      password: null,
      error: null,
      spinner: false
    }
  },
  methods: {
    onJoin (){
      this.error = null
      if (!this.name) {
        this.error = "Name field not be empty"
        return
      }
      if (!this.email) {
        this.error = "Email field not be empty"
        return
      }
      if (!this.password) {
        this.error = "Password field not be empty"
        return
      }
      this.spinner = true
      axios
        .post('/api/users/register', {
          name: this.name,
          email: this.email,
          password: this.password
        })
        .then(response => {
          this.spinner = false
          this.$router.push({ path: '/login' })
        })
        .catch(error => {
          this.spinner = false
          if(error && error.response && error.response.data && error.response.data.error) {
            this.error = error.response.data.error
          } else {
            this.error = "An error occurred. Try again."
          }
        })
    }
  },
  template: `
    <div class="container-fluid">
      <h3>Join</h3>
      <div class="row">
        <div class="col col-md-4">
          <b style="color: red;" v-if="error">{{ error }}</b>
          <div class="card" style="width: 18rem;">
            <div class="card-body">
              <div class="form-group">
                <label>Name:</label>
                <input type="text" v-model="name" class="form-control">
              </div>
              <div class="form-group">
                <label>Email:</label>
                <input type="email" v-model="email" class="form-control">
              </div>
              <div class="form-group">
                <label>Password:</label>
                <input type="password" v-model="password" class="form-control">
              </div>
            </div>
            <div class="card-footer text-muted">
              <button v-if="!spinner" @click="onJoin()" class="btn btn-primary">Join</button>
              <div v-if="spinner" class="spinner-border" role="status">
                <span class="sr-only">Loading...</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    `
};
