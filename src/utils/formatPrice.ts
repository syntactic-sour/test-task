export function formatTotalPrice(price: number, amount: number, currency: string): string {
  return `${(Math.trunc(amount * price * 100) / 100).toFixed(2)}\u00a0${currency}`
}

interface CollectionItem {
  [key: string]: number | unknown
}

interface Amounts {
  [key: string | number]: number
}

export function formatTotalPrices<P extends CollectionItem, A extends Amounts>({
  collection,
  amounts,
  keyPrice,
  keyAmount,
  currency,
}: {
  collection: Array<P>
  amounts: A
  keyPrice: string
  keyAmount: string
  currency: string
}): string {
  return `${(
    Math.trunc(
      collection.reduce((sum, item) => {
        sum += Math.trunc(
          amounts[item[keyAmount] as number | string] * (item[keyPrice] as number) * 100,
        )
        return sum
      }, 0),
    ) / 100
  ).toFixed(2)}\u00a0${currency}`
}
