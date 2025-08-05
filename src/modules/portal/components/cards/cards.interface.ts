export type CardItem = {
  id: string
  title: string
  description: string | string[]
  icon: React.ReactNode
  buttonText?: string
  buttonVariant?: 'default' | 'outline'
  href?: string
  additionalInfo?: string[]
  isDisabled?: boolean
}
