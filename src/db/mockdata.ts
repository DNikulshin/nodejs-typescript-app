interface IItem {
  title: string
  description: string
}

class MockData {
  items: IItem[] = []
  constructor() {}

  async getAll() {
    return this.items
  }
  createItem(item: IItem) {
    this.items.push(item)
    return this.items
  }
}

export default new MockData()
