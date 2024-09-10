<script>
/** @type {import('./$types').LayoutData} */
export let data
console.log('data', data)
</script>


<ul class="menu bg-base-200 w-56 p-0 [&_li>*]:rounded-none">
  <li class="menu-title">Title</li>
  {#each data.sections as section}
    <li>
      <a class="mr-10" href="/settings/{section.slug}">{section.title}</a>
    </li>
	{/each}
</ul>

<slot></slot>