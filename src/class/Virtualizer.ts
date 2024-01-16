class Virtualizer {
  settings = {
    minIndex: 1,
    maxIndex: 16, // can be 10k
    startIndex: 6,
    itemHeight: 20,
    amount: 5, // defines how many items are visible
    tolerance: 2, // determines how many items are rendered above and below the visible area
  };
  virtualRows: null | number = null;

  constructor() {
    this.init();
  }

  init = () => {
    const settings = this.settings;
    const { maxIndex, minIndex, amount, tolerance } = settings;
    this.virtualRows = maxIndex - minIndex + 1 - (amount + 2 * tolerance);
  };

  getData = (startIndex: number, limit: number) => {
    const settings = this.settings;
    const data = [];
    const start = Math.max(settings.minIndex, startIndex);
    const end = Math.min(startIndex + limit - 1, settings.maxIndex);
    if (start <= end) {
      for (let i = start; i <= end; i++) {
        data.push({ index: i, text: `item ${i}` });
      }
    }
    return data;
  };
}

export default Virtualizer;
