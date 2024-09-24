<script lang="ts">
    import { gql } from '@apollo/client/core';
    import { getContext } from 'svelte';
    import type { ApolloClient, NormalizedCacheObject } from '@apollo/client/core';
    
    const client = getContext<ApolloClient<NormalizedCacheObject>>('client');
    
    let email = '';
    let password = '';
    let error = '';
    
    const LOGIN_MUTATION = gql`
      mutation Login($email: String!, $password: String!) {
        login(email: $email, password: $password)
      }
    `;
    
    async function handleSubmit(): Promise<void> {
      try {
        const result = await client.mutate({
          mutation: LOGIN_MUTATION,
          variables: { email, password }
        });
        localStorage.setItem('token', result.data.login);
        // Redirect to profile page or update app state
      } catch (e) {
        error = e.message;
      }
    }
    </script>
    
    <form on:submit|preventDefault={handleSubmit}>
      <input type="email" bind:value={email} placeholder="Email" required>
      <input type="password" bind:value={password} placeholder="Password" required>
      <button type="submit">Login</button>
    </form>
    
    {#if error}
      <p>{error}</p>
    {/if}