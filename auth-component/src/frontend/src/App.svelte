<script lang="ts">
  import { Router, Link, Route } from "svelte-routing";
  import { setContext } from 'svelte';
  import type { ApolloClient, NormalizedCacheObject } from '@apollo/client/core';
  import Login from "../components/Auth/Login.svelte";
  import Register from "../components/Auth/Register.svelte";
  import Profile from "../components/Auth/Profile.svelte";
  import PasswordReset from "../components/Auth/PasswordReset.svelte";
  
  export let client: ApolloClient<NormalizedCacheObject>;
  setContext('client', client);
</script>
    
    <Router>
      <nav>
        <Link to="/">Home</Link>
        <Link to="/login">Login</Link>
        <Link to="/register">Register</Link>
        <Link to="/profile">Profile</Link>
        <Link to="/reset-password">Reset Password</Link>
      </nav>
    
      <main>
        <Route path="/login" component={Login} />
        <Route path="/register" component={Register} />
        <Route path="/profile" component={Profile} />
        <Route path="/reset-password" component={PasswordReset} />
      </main>
    </Router>