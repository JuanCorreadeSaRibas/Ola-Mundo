print('Analisandor de  triangulos')
r1 = float(input('Digite o 1º segimentos: '))
r2 = float(input('Digite o 2º segimentos: '))
r3 = float(input('Digite o 3º segimentos: '))
if r1 < r2 + r3 and r2 < r1 + r3  and r3 < r1 + r2:
    print('Pode formar um TRIÂNGULO.', end='')
    if r1 == r2 == r3:
        print('|EQUILÁTERO|')

    elif r1 != r2 and r2 != r3 != r1:
        print('|ESCALENO|')

    else:
        print('|ISÓLECELES|')
else:
    print('Não pode formar um TRIÂNGULO')
