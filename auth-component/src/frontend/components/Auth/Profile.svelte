<script lang="ts">
    import { gql } from '@apollo/client/core';
    import { getContext, onMount } from 'svelte';
    import type { ApolloClient, NormalizedCacheObject } from '@apollo/client/core';
    
    const client = getContext<ApolloClient<NormalizedCacheObject>>('client');
    
    let user = null;
    let error = '';
    
    const ME_QUERY = gql`
      query Me {
        me {
          id
          email
          username
        }
      }
    `;
    
    onMount(async () => {
      try {
        const result = await client.query({
          query: ME_QUERY,
          fetchPolicy: 'network-only'
        });
        user = result.data.me;
      } catch (e) {
        error = e.message;
      }
    });
    
    function logout(): void {
      localStorage.removeItem('token');
      // Redirect to login page or update app state
    }
    </script>
    
    {#if user}
      <h2>Welcome, {user.username}!</h2>
      <p>Email: {user.email}</p>
      <button on:click={logout}>Logout</button>
    {:else if error}
      <p>Error: {error}</p>
    {:else}
      <p>Loading...</p>
    {/if}