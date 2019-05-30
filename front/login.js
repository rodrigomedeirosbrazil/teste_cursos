export default {
  name: "Login",
  data () {
    return {
      email: null,
      password: null,
      error: null,
      spinner: false
    }
  },
  methods: {
    onLogin (){
      this.error = null
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
        .post('/api/users/authenticate', {
          email: this.email,
          password: this.password
        })
        .then(response => {
          this.spinner = false
          let token = response.data.data.token
          if(token) {
            localStorage.setItem("jwt_token", token)
            this.$router.push({ path: '/' })
          } else {
            this.error = "An error occurred. Try again."
          }
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
      <h3>Login</h3>
      <div class="row">
        <div class="col col-md-4">
          <b style="color: red;" v-if="error">{{ error }}</b>
          <div class="card" style="width: 18rem;">
            <div class="card-body">
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
              <button v-if="!spinner" @click="onLogin()" class="btn btn-primary">Login</button>
              <div v-if="spinner" class="spinner-border" role="status">
                <span class="sr-only">Loading...</span>
              </div>
            </div>
          </div>
          <a href="#/join">Click here to join us now!</a>
        </div>
      </div>
    </div>
    `
};
