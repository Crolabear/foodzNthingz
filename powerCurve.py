
import numpy as np
import math
import matplotlib.pyplot as plt
import random
from scipy.stats import norm


def computeMean_SD(sample1):
    sampleMean = sum(sample1)/len(sample1)
    VarofSample = sum(map(lambda x:(x-sampleMean)*(x-sampleMean),sample1))/(len(sample1))
    sampleVar = VarofSample/len(sample1)
    return (sampleMean,sampleVar)
    

def generate20Normal(L):
    sample200 = []
    for i in range(L):
        sample200.append(np.random.normal(0.5,1))
    return sample200
    
 
def generate20Mix_Normal():
    sampleMix = []
    for i in range(200):
        draw = random.randint(0,9)
        if draw > 1:
          sampleMix.append(np.random.normal(0.5,1))
        if draw < 1:
          sampleMix.append(np.random.normal(0.5,5))
    return sampleMix   
    

def computeZ(sampleMean,sampleVar,mu0):
    z = (sampleMean - mu0)/math.sqrt(sampleVar)
    return z

# now simulate 1000 draws from normal1:    

zvalues = []
for item in range(1000):
    normal_1 = generate20Normal(20)    # this is from normal(0.5,1)
    meanSD = computeMean_SD(normal_1)
    zvalues.append(computeZ(meanSD[0],meanSD[1],0))

def genPowerCurve(simulatedZ):
    n = len(simulatedZ)
    alpha = np.linspace(0.001,0.4,num=100)
    power = []
    for item in alpha:
        cutoff = norm.ppf(item)
        check = sum(map(lambda x:abs(x) < abs(cutoff),simulatedZ)) # count how many fail to reject
        power.append((n-check)/n)
    return (alpha,power)



zvalues = []
for item in range(1000):
    normal_2 = generate20Mix_Normal()    # this is from normal(0.5,1)
    meanSD = computeMean_SD(normal_2)
    zvalues.append(computeZ(meanSD[0],meanSD[1],0))

  # this is from the mix-normal

alp1,pow1 = genPowerCurve(zvalues)
plt.xlabel('significance level')
plt.ylabel('power')
plt.plot(alp1,pow1)
plt.show()


