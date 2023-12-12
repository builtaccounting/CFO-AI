<template>
  <div>

    <v-row>
      <v-col cols="12" sm="5">
        <v-card
            class="ma-5 mx-auto login-child"
            width="550px"
            flat
            style="padding: 80px"
        >
          <h4 class="text-center text-h5">Login with your <a class="text-decoration-none" style="font-family: inherit !important;" href="https://built.africa" target="_blank">Built<sup><v-icon color="blue" x-small>mdi-arrow-right-top</v-icon></sup></a> Account</h4>
          <v-card-text class="mt-4">
            <v-form ref="login_form">
              <label>Email</label>
              <v-text-field
                  type="email"
                  outlined
                  v-model="email"
                  autofocus
                  :rules="[(v) => !!v || 'E-mail is required']"
                  flat
                  placeholder="Built account email"
                  @keydown.enter="login"
              ></v-text-field>

              <label>Password</label>

              <v-text-field
                  @keydown.enter="login"
                  outlined
                  :type="passwordType"
                  :rules="[(v) => !!v || 'Password is required']"
                  v-model="password"
                  placeholder="Built account password"
                  flat
                  @click:append="showPassword=!showPassword"
                  :append-icon="passwordIcon"
              ></v-text-field>
            </v-form>
          </v-card-text>
          <v-card-actions>
            <v-btn
                :loading="loading"
                rounded
                depressed
                block
                x-large
                color="blue darken-4"
                @click="login"
                class="text-capitalize white--text font-weight-bold mx-auto mb-5"
            >Login
            </v-btn>


          </v-card-actions>

          <p class="pa-3 text-center">
            <a class="grey--text text-decoration-none ma-2" href="https://built.africa">Home</a>
            <a class="grey--text text-decoration-none ma-2" href="https://built.africa">Help</a>
            <a class="grey--text text-decoration-none ma-2" href="https://built.africa">Terms & Conditions</a>
          </p>
        </v-card>
      </v-col>
      <v-col cols="12" sm="7" class="blue darken-4 full-height white--text main-bg"
             style="height: 100dvh; margin-top: 12px">


        <div class="text-container">

          <div class="child">

            <h2 class="text-center text-h3 font-weight-black">Welcome to CFO <span class="yellow--text"
                                                                                   style="font-family: inherit !important;">AI<sup><v-icon color="yellow" class="ma-0" style="left:-3px">mdi-shimmer</v-icon></sup></span>
            </h2>
            <p class="text-center text-h5 mt-3 typewriter">
              Convert your finance data into professional management reports
            </p>
            <p class="text-h4 text-center mt-5 pt-5">
              By
              <img
                  style="position:inline !important;"
                  width="100"
                  src="https://built-storage.ams3.cdn.digitaloceanspaces.com/Built/logo2.webp"
              >
            </p>
          </div>

        </div>


      </v-col>
    </v-row>

    <v-snackbar v-model="snackbar" :color="snackbarColor">{{ snackbarMsg }}</v-snackbar>
  </div>

</template>

<script>
import {initUser, setAccessToken, setUser} from "@/utils";

export default {
  name: "login",
  data() {
    return {
      email: null,
      password: null,
      snackbar: false,
      snackbarMsg: null,
      snackbarColor: null,
      loading: false,
      showPassword:false
    };
  },
  computed:{

    passwordType(){

   return    this.showPassword ? "text" : "password";

    },

    passwordIcon(){

      return this.showPassword ?  "mdi-eye-off-outline" : "mdi-eye-outline"

    }

  },
  methods: {
    login() {

        if (this.$refs.login_form.validate()) {

          this.loading = true
          const formdata = {
            email: this.email,
            password: this.password,
          };

          axios.post("/api/auth/login", formdata,)
              .then((user) => {

                this.loading = false;
                this.$store.commit("SET_USER", user.data.user);
                setAccessToken(user.data.access_token);
                this.$router.push("/");

              }).catch((error) => {
            this.snackbar = true;
            this.snackbarMsg = "Something went wrong. Please try again later.";
            this.snackbarColor = "error";
            this.loading = false

          })
        }

    },
  }
};
</script>


<style scoped>
.typewriter {
  width: 75%;
  color: #fff;
  font-family: monospace;
  overflow: hidden; /* Ensures the content is not revealed until the animation */
  border-right: .15em solid #FFEB3B; /* The typwriter cursor */
  white-space: nowrap; /* Keeps the content on a single line */
  margin: 0 auto; /* Gives that scrolling effect as the typing happens */
  letter-spacing: .15em; /* Adjust as needed */
  animation: typing 3.5s steps(30, end),
  blink-caret .5s step-end infinite;
}

/* The typing effect */
@keyframes typing {
  from {
    width: 0
  }
  to {
    width: 100%
  }
}

/* The typewriter cursor effect */
@keyframes blink-caret {
  from, to {
    border-color: transparent
  }
  50% {
    border-color: #FFEB3B
  }
}

.main-bg {

  background-image: url("/public/img/login_bg.jpg");
  background-size: cover;
  background-repeat: no-repeat;
  background-blend-mode: multiply;

}

.text-container {
  font-size: 24px;
  margin: 25px;
  width: 100%;
  height: 95%;
  position: relative;
}

.login-child{

  /* Center vertically and horizontally */
  position: absolute;
  top: 50%;
  left: 28%;
  transform: translate(-50%, -50%);
}


.child {
  width: 100%;
  height: 50px;
  /* Center vertically and horizontally */
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
</style>
