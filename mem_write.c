#include <stdio.h>
#include <stdlib.h>
#include <unistd.h>
#include <fcntl.h>
#include <sys/mman.h>

#define SDRAM_BASE_ADDRESS 0x80000000 // Base address of the SDRAM region

int main(int argc, char *argv[]) {
    if (argc != 2) return 1;
    
    char* inputBits = argv[1];

    int mem_fd = open("/dev/mem", O_RDWR | O_SYNC);
    if (mem_fd == -1) {
        perror("Error opening /dev/mem");
        return 1;
    }
    
    void* mapped_base = mmap(NULL, 4096, PROT_READ | PROT_WRITE, MAP_SHARED, mem_fd, SDRAM_BASE_ADDRESS);
    if (mapped_base == MAP_FAILED) {
        perror("Error mapping memory");
        close(mem_fd);
        return 1;
    }
    
    off_t offset = 0; // Modify this offset based on specific register address

    uint32_t* register_ptr = (uint32_t*)(mapped_base + offset);
    
    *register_ptr = strtoul(inputBits, NULL, 2);
    
    munmap(mapped_base, 4096);
    close(mem_fd);

    return 0;
}