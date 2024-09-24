<script lang="ts">
    import { gql } from '@apollo/client/core';
    import { getContext } from 'svelte';
    import type { ApolloClient, NormalizedCacheObject } from '@apollo/client/core';
    
    const client = getContext<ApolloClient<NormalizedCacheObject>>('client');
    
    let email = '';
    let message = '';
    let error = '';
    
    const REQUEST_PASSWORD_RESET_MUTATION = gql`
      mutation RequestPasswordReset($email: String!) {
        requestPasswordReset(email: $email)
      }
    `;
    
    async function handleSubmit(): Promise<void> {
      try {
        const result = await client.mutate({
          mutation: REQUEST_PASSWORD_RESET_MUTATION,
          variables: { email }
        });
        message = result.data.requestPasswordReset;
      } catch (e) {
        error = e.message;
      }
    }
    </script>
    
    <form on:submit|preventDefault={handleSubmit}>
      <input type="email" bind:value={email} placeholder="Email" required>
      <button type="submit">Request Password Reset</button>
    </form>
    
    {#if message}
      <p>{message}</p>
    {/if}
    
    {#if error}
      <p>{error}</p>
    {/if}