import zerorpc

c = zerorpc.Client()
c.connect("tcp://127.0.0.1:3000")
place = c.hello("")
print(place)
