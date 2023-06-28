#include <stdio.h>
#include <string.h>
#define MAX 1028

int main() {
	char str[MAX] = "";
	
	scanf("%s", str);
	int len = strlen(str);
	
	for(int i = 0;i<len;i++) {
		if(str[i] == '\'')
			continue;
		printf("%c", str[i]);
	}
	return 0;
}