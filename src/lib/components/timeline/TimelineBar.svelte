<script lang="ts">
  import { Button } from "@specialdoom/proi-ui";
  import dayjs from "../../utils/day-js.js";
  import { current, min } from "../../stores/days";
  import NewTaskDialog from "../dialogs/NewTaskDialog.svelte";

  let visible: boolean = false;

  function changeDay(dayToAdd: number) {
    $current = $current.add(dayToAdd, "day");
  }

  function toToday() {
    $current = dayjs();
  }
</script>

<NewTaskDialog bind:visible on:ok={() => (visible = false)} />

<div class="timeline-bar">
  <div class="timeline-bar-header">
    <div class="date-details">
      <span class="date">{$current.format("MMMM D")}</span>
      <span class="day-of-the-week">{$current.format("dddd")}</span>
    </div>
    <div class="controls">
      {#if !$min.isSame($current, "day")}
        <Button on:click={() => changeDay(-1)} variant="ghost">
          Previous day
        </Button>
      {/if}
      {#if $current.isToday()}
        <Button on:click={() => (visible = true)}>Add task</Button>
      {/if}
      {#if !$current.isToday()}
        <Button variant="secondary" on:click={toToday}>Today</Button>
        <Button on:click={() => changeDay(1)} variant="ghost">Next day</Button>
      {/if}
    </div>
  </div>
</div>

<style>
  .timeline-bar {
    display: flex;
    flex-direction: column;
    width: 100%;
    padding: 16px 8px;
    box-sizing: border-box;
  }

  .timeline-bar-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 16px;
  }

  .date-details {
    display: flex;
    flex-direction: column;
  }

  .date {
    font-size: 20px;
    font-weight: bold;
  }

  .day-of-the-week {
    font-size: 12px;
  }

  @media only screen and (max-width: 500px) {
    .timeline-bar-header {
      flex-direction: column;
    }

    .date-details {
      width: 100%;
      align-items: center;
      display: flex;
      gap: 8px;
    }
  }
</style>
