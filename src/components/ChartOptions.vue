<script setup lang="ts">
import { CheckIcon, ChevronsUpDownIcon } from 'lucide-vue-next';
import { ref } from 'vue';
import { Button } from './ui/button';
import { Command, CommandGroup, CommandItem, CommandList } from './ui/command';
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover';
import { cn } from '@/lib/utils';

const chartTypes = [
  'bar', 'line', 'pie'
]

const open = ref(false)
const value = ref('')

function updateSelectedChart() {
  localStorage.setItem('chart', value.value)
}
</script>

<template>
  <Popover v-model:open="open">
    <PopoverTrigger as-child>
      <Button variant="secondary" role="combobox" :aria-expanded="open" class="w-[300px] justify-between capitalize">
        {{ value || "Select chart type - Bar by default" }}
        <ChevronsUpDownIcon />
      </Button>
    </PopoverTrigger>
    <PopoverContent class="w-[300px] p-0">
      <Command>
        <CommandList>
          <CommandGroup>
            <CommandItem class=" capitalize" v-for="chart, idx in chartTypes" :key="idx" :value="chart" @select="() => { value = chart, open = false, updateSelectedChart() }">
              <CheckIcon :class="cn('mr-2 h-4 w-4', value === chart ? 'opacity-100' : 'opacity-0')" />
              {{ chart }}
            </CommandItem>
          </CommandGroup>
        </CommandList>
      </Command>
    </PopoverContent>
  </Popover>
</template>
