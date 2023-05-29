#include <stdio.h>
#include <stdlib.h>
#include <fcntl.h>
#include <unistd.h>
#include <sys/mman.h>
#include <string.h>

#define BASE_ADDRESS 0xFF200000
#define REGISTER_SIZE 0x1000
#define OFFSET 0x00

int main(int argc, char *argv[]) {
    if (argc != 2 || strlen(argv[1]) != 4) {
        printf("Usage: %s <4-bit-value>\n", argv[0]);
        return 1;
    }


    // Parse the command line argument as a 4-bit value
    unsigned int value = strtoul(argv[1], NULL, 2) & 0xF;

    // Open the /dev/mem device to access physical memory
    int mem_fd = open("/dev/mem", O_RDWR | O_SYNC);
    if (mem_fd < 0) {
        perror("Failed to open /dev/mem");
        return 1;
    }

    // Map the GPIO1 memory region into user space
    void *base = mmap(NULL, REGISTER_SIZE, PROT_READ | PROT_WRITE, MAP_SHARED, mem_fd, BASE_ADDRESS);
    if (base == MAP_FAILED) {
        perror("Failed to mmap GPIO1 memory");
        close(mem_fd);
        return 1;
    }

    // Write the 4-bit value to the GPIO1 register
    unsigned int *mem_location = (unsigned int *)((char *)base + OFFSET);
    *mem_location = value;

    // Unmap the GPIO1 memory region
    if (munmap(base, REGISTER_SIZE) < 0) {
        perror("Failed to unmap GPIO1 memory");
    }

    // Close the /dev/mem device
    close(mem_fd);

    printf("Value written to GPIO1: %X", value);

    return 0;
}
