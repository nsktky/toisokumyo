<template>
  <v-app>
    <div class="login-box">
      <v-card class="login-form">
        <v-card-title class="login-title">Login</v-card-title>
        <v-card-subtitle>管理者情報を入力してください。</v-card-subtitle>
        <v-form ref="form" v-model="valid" lazy-validation>
          <v-text-field
            v-model="email"
            :rules="emailRules"
            label="E-mail"
            required
          ></v-text-field>
          <v-text-field v-model="password" type="password" label="Password">
          </v-text-field>

          <v-btn
            color="success"
            class="login-btn"
            @click="submit"
            :disabled="isValid"
          >
            LOGIN
          </v-btn>

          <v-btn @click="reset"> CLEAR </v-btn>

          <v-btn
            color="warning"
            class="logout-btn"
            @click="logout"
            :disabled="isValid"
          >
            LOGOUT
          </v-btn>

          <v-alert
            dense
            text
            type="success"
            class="success-message"
            v-if="message"
          >
            {{ message }}
          </v-alert>

          <v-alert
            dense
            outlined
            type="error"
            class="error-message"
            v-if="errorMessage"
          >
            {{ errorMessage }}
          </v-alert>
        </v-form>
      </v-card>
    </div>
  </v-app>
</template>

<style>

.login-form {
  margin: 150px;
  padding: 30px;
}
.login-box {
  margin: 0px auto;
  padding: 30px;
}
.login-title {
  display: inline-block;
}
.login-btn {
  margin-right: 10px;
}
.logout-btn {
  margin: 10px;
}
.success-message {
  margin-top: 20px;
}
.error-message {
  margin-top: 20px;
}
</style>

<script>
import firebase from "@/firebase/firebase";
export default {
  data: () => ({
    valid: true,
    email: "",
    emailRules: [
      (v) => !!v || "メールアドレスを入力してください",
      (v) => /.+@.+\..+/.test(v) || "正しいメールアドレスを入力してください",
    ],
    password: "",
    message: "",
    errorMessage: "",
  }),
  computed: {
    isValid() {
      return !this.valid;
    },
  },
  methods: {
    validate() {
      this.$refs.form.validate();
    },
    reset() {
      this.message = ""
      this.errorMessage = ""
      this.$refs.form.reset();
    },
    resetValidation() {
      this.$refs.form.resetValidation();
    },
    submit() {
      this.message = ""
      this.errorMessage = ""
      if(this.emaill || this.password) {
        console.log("submit call");
        firebase
          .auth()
          .signInWithEmailAndPassword(this.email, this.password)
          .then(async result => {
            console.log(result)
            // const auth = {
            //   displayName: result.user.displayName,
            //   email: result.user.email,
            //   uid: result.user.uid,
            //   refreshToken: result.user.refreshToken,
            // }
            // await sessionStorage.setItem('user', JSON.stringify(auth))
            this.$router.push('admin_upload')
          })
          .catch((error) => {
            console.log("fail", error);
            this.errorMessage = "ログインに失敗しました"
          });
      } else {
        this.errorMessage = "入力して下さい"
      }
    },
    logout() {
      this.message = ""
      this.errorMessage = ""
      firebase.auth()
      .signOut()
      .then(() => {
        this.message = "ログアウトに成功しました"
        // await this.$router.push("/")
      })
      .catch((error) => {
        console.log(error)
        this.errorMessage = "ログアウトできませんでした"
      })
    }
  },
};
</script>