<script lang="ts">
let count: number = 0
const increment = () => {
  count += 1
}
</script>

<button on:click={increment} class="btn btn-sm btn-primary">
  count is {count}
</button>
