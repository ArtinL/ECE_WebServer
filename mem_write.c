#include <stdio.h>
#include <stdlib.h>
#include <fcntl.h>
#include <unistd.h>
#include <sys/mman.h>
#include <string.h>

#define BASE_ADDR 0xC0000000
#define OFFST 0x00
#define SPAN 0x1000

int main(int argc, char *argv[]) {
    int mem_fd;
    void *virtual_base, *mapped_base;
    volatile unsigned int *io_pio;

    // Open the /dev/mem device
    if ((mem_fd = open("/dev/mem", O_RDWR | O_SYNC)) == -1) {
        printf("Failed to open /dev/mem\n");
        return -1;
    }

    // Map the physical memory region to the virtual address space
    virtual_base = mmap(NULL, SPAN, PROT_READ | PROT_WRITE, MAP_SHARED, mem_fd, BASE_ADDR);

    if (virtual_base == MAP_FAILED) {
        printf("Failed to mmap memory\n");
        close(mem_fd);
        return -1;
    }

    // Calculate the memory-mapped address for the PIO
    mapped_base = virtual_base + OFFST;

    // Cast the mapped address to the volatile unsigned int pointer
    io_pio = (volatile unsigned int *) mapped_base;

    // Convert the command line argument to an integer
    unsigned int value = strtoul(argv[1], NULL, 2);

    // Write the value to the PIO register
    *io_pio = value;

    printf("Wrote %d to the PIO\n", value);

    // Unmap the memory and close /dev/mem
    munmap(virtual_base, SPAN);
    close(mem_fd);

    return 0;
}

