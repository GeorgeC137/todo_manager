<template>
  <div>
    <h3>Add Todo</h3>
    <div class="add">
      <form @submit="onSubmit">
        <input type="text" v-model="title" placeholder="Add todo..." />

        <input type="submit" value="Submit" />
      </form>

      <transition
        name="alert-in"
        enter-active-class="animated flipInX"
        leave-active-class="animated flipOutX"
      >
        <p class="alert" v-if="v$.title.$error">{{ v$.title.$errors[0].$message }}</p>
      </transition>
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex";
import { useVuelidate } from "@vuelidate/core";
import { required, minLength } from "@vuelidate/validators";

export default {
  name: "AddTodo",
  data() {
    return {
      v$: useVuelidate(),
      title: "",
    };
  },
  validations() {
    return {
      title: { required, minLength: minLength(4) },
    };
  },
  methods: {
    ...mapActions(["addTodo"]),
    onSubmit(e) {
      e.preventDefault();

      this.v$.$validate();
      if (!this.v$.$error) {
        this.addTodo(this.title);

        this.title = "";
      }
    },
  },
};
</script>

<style scoped>
@import "https://cdn.jsdelivr.net/npm/animate.css@3.5.1";

form {
  display: flex;
}

input[type="text"] {
  flex: 10;
  padding: 10px;
  border: 1px solid #41b883;
  outline: 0;
}

input[type="submit"] {
  flex: 2;
  background: #10e987;
  color: #fff;
  border: 1px #41b883 solid;
  cursor: pointer;
}

p {
  text-align: center;
  padding: 30px 0;
  color: gray;
}

.alert {
  background: #fdf2ce;
  font-weight: bold;
  display: inline-block;
  padding: 5px;
  margin-top: -20px;
}

.alert-in-enter-active {
  animation: bounce-in 0.5s;
}
.alert-in-leave-active {
  animation: bounce-in 0.5s reverse;
}

@keyframes bounce-in {
  0% {
    transform: scale(0);
  }
  50% {
    transform: scale(1.5);
  }
  100% {
    transform: scale(1);
  }
}
</style>
