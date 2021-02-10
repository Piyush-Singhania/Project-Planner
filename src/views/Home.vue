<template>
  <FilterNav @filterChange="current = $event" :current="current" />
  <div class="home">
    <div v-if="projects.length">
      <div v-for="project in filteredProjects" :key="project.id">
        <SingleProject :project="project" @delete="handleDelete" @complete="handleComplete"/>
      </div>
    </div>
  </div>
</template>

<script>
import SingleProject from '../components/SingleProject.vue'
import FilterNav from '../components/FilterNav'
import {projectFirestore} from '../firebase/config'

export default {
  name: 'Home',
  components: { SingleProject, FilterNav},
  computed:{
    filteredProjects(){
      if(this.current === 'completed'){
        return this.projects.filter(project => project.complete)
      }
      if(this.current === 'ongoing'){
        return this.projects.filter(project => !project.complete)
      }
      return this.projects;
    }
  },
  data(){
    return{
      projects: [],
      current: 'all'
    }
  },
  mounted(){
    // fetch("http://localhost:3000/projects")
    //   .then(res => res.json())
    //   .then(data => this.projects = data)
    //   .catch(err => console.log(err.message));

    const load = async () => {
      try{
        const res = await projectFirestore
        .collection('projects')
        .orderBy('createdAt', 'desc')
        .get();
  
        this.projects = res.docs.map((doc) => {
          return{ ...doc.data(), id: doc.id};
        })
      }
      catch(err){
        console.log(err);
      }

    }
    load();

  },
  methods:{
    handleDelete(id){
      // this.projects = this.projects.filter((project) => {
      //   return project.id !== id;
      // })
      const load = async () => {
        try{
          const res = await projectFirestore
          .collection('projects')
          .orderBy('createdAt', 'desc')
          .get();
    
          this.projects = res.docs.map((doc) => {
            return{ ...doc.data(), id: doc.id};
          })
        }
        catch(err){
          console.log(err);
        }
      }
      load();
    },

    handleComplete(id){
      // let p = this.projects.find((project) => {
      //   return project.id === id;
      // })
      // p.complete = !p.complete

      const load = async () => {
      try{
        const res = await projectFirestore
        .collection('projects')
        .orderBy('createdAt', 'desc')
        .get();
  
        this.projects = res.docs.map((doc) => {
          return{ ...doc.data(), id: doc.id};
        })
      }
      catch(err){
        console.log(err);
      }

    }
    load();
    },
  }
}
</script>
