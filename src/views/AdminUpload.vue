<template>
<v-sheet color="grey lighten-4" class="pa-4">
    <h1>admin_upload</h1>
    <v-file-input
        type="file"
        v-model="image"
        accept="image/jpeg, image/jpg, image/png"
        @change="uploadImage"
    >
    <!-- <input
        type="file"
        ref="fileInput"
        accept="image/jpeg, image/jpg, image/png"
        @change="uploadImage"
    /> -->
    </v-file-input>
</v-sheet>

</template>

<script>
import firebase from "@/firebase/firebase"
export default {
    data: () => ({
        image:[]
    }),
    methods: {
        uploadImage() {
            console.log("UploadImage called");
            const user = this.getAuth()
            if(!user) {
                sessionStorage.removeItem(user)
                this.$router.push("/admin")
            }
            const file = this.image
            // const file = this.$refs.fileInput.files[0]
            const filePath = `/user/${file.name}`
            console.log(file)
            console.log(filePath)


            firebase.storage().ref()
            .child(filePath)
            .put(file)
            .then(snapshot => {
                console.log("snapshot", snapshot)
            })
        },
        getAuth() {
            return firebase.auth().onAuthStateChanged((user) => {
                return user
            })
        }
    },
};
</script>