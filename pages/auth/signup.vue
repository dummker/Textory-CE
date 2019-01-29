<template>
  <the-auth-form
    :signIn="false"
  ></the-auth-form>
</template>
<script>
import TheAuthForm from '@/components/auth/TheAuthForm';

export default {
  components: {
    TheAuthForm
  }
}
</script>
