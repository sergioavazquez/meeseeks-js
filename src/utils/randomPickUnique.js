function randomPickUnique(arr, nPicks = 1) {
  const ar = [...arr];
  const picks = [];
  let remPicks = nPicks;

  while (remPicks) {
    const pickIdx = Math.floor(Math.random() * ar.length);
    picks.push(ar[pickIdx]);
    ar.splice(pickIdx, 1);
    remPicks -= 1;
  }
  return picks;
}

module.exports.randomPickUnique = randomPickUnique;
