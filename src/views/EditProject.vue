<template>
  <form @submit.prevent="handleSubmit">
      <label>Title:</label>
      <input type="text" v-model="title" required>
      <label>Details:</label>
      <textarea v-model="details" required></textarea>
      <button>Update Project</button>
  </form>
</template>

<script>
import {projectFirestore} from '../firebase/config'

export default {
    props:['id'],
    data(){
        return{
            title:'',
            details:'',
            // uri: 'http://localhost:3000/projects/' + this.id,
        }
    },
    mounted(){
        // fetch(this.uri)
        //     .then(res => res.json())
        //     .then(data => {
        //         this.title = data.title;
        //         this.details = data.details;
        //     }).catch(err => console.log(err.message));

        const load = async () => {
            try{
                const res = await projectFirestore
                .collection('projects')
                .doc(this.id)
                .get();

                if(!res){
                    throw new Error("No response fetched")
                }

                this.title = res.data().title;
                this.details = res.data().details;
            }
            catch(err){
                console.log(err)
            }
        }
        load();
    },
    methods:{
        handleSubmit(){
            // fetch(this.uri, {
            // method: 'PATCH',
            // headers: {'Content-Type': 'application/json'},
            // body: JSON.stringify({title: this.title, details: this.details})
            // }).then(() => {
            //   this.$router.push('/');
            // }).catch(err => console.log(err.message));

            const load = async () => {
                try{
                    const res = await projectFirestore
                    .collection('projects')
                    .doc(this.id)
                    .update({
                        "title": this.title,
                        "details": this.details,
                    });
                }
                catch(err){
                    console.log(err);
                }
            }
            load();
            this.$router.push('/');
        }
    }
}
</script>

<style>

</style>