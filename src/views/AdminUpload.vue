<template>
<v-form ref="form" v-model="valid" lazy-validation>
    <h1>admin_upload</h1>
    <v-textarea
        v-model="title"
        append-icon="mdi-comment"
        class="mx-2"
        label="タイトル"
        rows="1"
        auto-grow
    >
    </v-textarea>

    <v-textarea
        v-model="url"
        :rules="urlRules"
        append-icon="mdi-comment"
        class="mx-2"
        label="url"
        rows="1"
        auto-grow
    >
    </v-textarea>
    
    <v-file-input
        type="file"
        accept="image/jpeg, image/jpg, image/png"
        v-model="image"
        @change="uploadImage"
    >
    </v-file-input>

    <v-btn 
        :disabled="isValid"
        @click="submit"
        style="margin: 1rem"
    >
        submit
    </v-btn>

    <v-alert
        outlined
        type="success"
        class="success-message"
        v-if="message"
    >
        {{ message }}
    </v-alert>

    <v-alert
        outlined
        type="error"
        class="error-message"
        v-if="errorMessage"
    >
        {{ errorMessage }}
    </v-alert>
</v-form>

</template>

<script>
import firebase from "@/firebase/firebase"
export default {
    data: () => ({
        valid: true,
        urlRules: [
        (v) => !!v || "urlを入力してください",
        ],
        title: "",
        url: "",
        image:[],
        filePath: "",
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
        resetValidation() {
            this.$refs.form.resetValidation();
        },
        uploadImage() {
            this.message = ""
            this.errorMessage = ""
            this.filePath = ""

            console.log("UploadImage called");
            const user = this.getAuth()
            if(!user) {
                sessionStorage.removeItem(user)
                this.$router.push("/admin")
            }
            const file = this.image
            this.filePath = `/user/${file.name}`
        },

        getAuth() {
            return firebase.auth().onAuthStateChanged((user) => {
                return user
            })
        },

        submit() {
            this.message = ""
            this.errorMessage = ""
            if(this.filePath){
                const file = this.image
                firebase.storage().ref()
                .child(this.filePath)
                .put(file)
                .then(async snapshot => {
                    const imageUrl = await snapshot.ref.getDownloadURL()
                    firebase.firestore().collection("works").add({
                    title: this.title,
                    url: this.url,
                    imageUrl: imageUrl,
                    createdAt: firebase.firestore.Timestamp.now(),
                    })
                    .then(result => {
                        this.message = "送信しました"
                        console.log(result)
                        this.title = ""
                        this.url = ""
                    })
                    .catch(error => {
                        console.log(error)
                        this.errorMessage = "送信できませんでした"
                    })
                
                })

                
                .catch((error) => {
                    console.log("error", error)
                    this.errorMessage = "送信できませんでした"
                })
            } else {
                this.errorMessage = "入力して下さい"
            }
        },
    },
};
</script>