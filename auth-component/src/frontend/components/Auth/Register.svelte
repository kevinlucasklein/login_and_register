<script lang="ts">
    import { gql } from '@apollo/client/core';
    import { getContext } from 'svelte';
    import type { ApolloClient, NormalizedCacheObject } from '@apollo/client/core';
    
    const client = getContext<ApolloClient<NormalizedCacheObject>>('client');
    
    let email = '';
    let password = '';
    let username = '';
    let error = '';
    
    const REGISTER_MUTATION = gql`
      mutation Register($email: String!, $password: String!, $username: String!) {
        register(email: $email, password: $password, username: $username)
      }
    `;
    
    async function handleSubmit(): Promise<void> {
      try {
        const result = await client.mutate({
          mutation: REGISTER_MUTATION,
          variables: { email, password, username }
        });
        if (result.data.register) {
          // Registration successful, you might want to automatically log the user in
          // or redirect them to the login page
          console.log('Registration successful');
        }
      } catch (e) {
        error = e.message;
      }
    }
    </script>
    
    <form on:submit|preventDefault={handleSubmit}>
      <input type="text" bind:value={username} placeholder="Username" required>
      <input type="email" bind:value={email} placeholder="Email" required>
      <input type="password" bind:value={password} placeholder="Password" required>
      <button type="submit">Register</button>
    </form>
    
    {#if error}
      <p>{error}</p>
    {/if}