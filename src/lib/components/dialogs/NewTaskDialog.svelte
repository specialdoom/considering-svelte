<script lang="ts">
  import type { Task } from "../../utils/types";
  import {
    Dialog,
    FormItem,
    Radio,
    Textarea,
    TextInput,
  } from "@specialdoom/proi-ui";
  import { generateNewTask, TASKS } from "../../utils/task";
  import { tasks, current } from "../../stores/days";
  import { auth } from "../../stores/auth";
  import { addTaskForUser } from "../../services/firestore-tasks";

  export let visible: boolean = true;

  let task: Task = generateNewTask($current);

  function addNewTask() {
    $tasks = [...$tasks, { ...task }];

    addTaskForUser($auth.uid, { ...task });

    task = generateNewTask();
  }
</script>

<Dialog
  bind:visible
  title="🗒️ Add new task: {$current.format('DD/MM/YYYY, HH:mm')}"
  on:ok={addNewTask}
  on:ok
>
  <FormItem label="Title">
    <TextInput placeholder="Task title" bind:value={task.title} />
  </FormItem>
  <FormItem label="Description" description="Optional">
    <Textarea
      placeholder="Task description"
      bind:value={task.description}
      rows={2}
    />
  </FormItem>
  <FormItem label="Task type">
    <div class="radio-group">
      {#each Object.entries(TASKS) as entry}
        <Radio value={entry[0]} bind:group={task.type}>
          {entry[1]}
        </Radio>
      {/each}
    </div>
  </FormItem>
</Dialog>

<style>
  .radio-group {
    display: flex;
    flex-wrap: wrap;
    width: 300px;
    gap: 4px;
  }
</style>
