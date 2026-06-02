await groot.add("sample.txt");
  await groot.add("sample2.txt");
  await groot.commit("here we go");

  await groot.log()