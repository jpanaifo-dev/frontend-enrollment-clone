// /* eslint-disable react-hooks/exhaustive-deps */
// 'use client'

// import { createAccount } from '@/api/auth'
// import { fetchDocument } from '@/api/consults'
// import { getUserPerson } from '@/api/persons'
// import { Button } from '@/components/ui/button'
// import { Checkbox } from '@/components/ui/checkbox'
// import { Input } from '@/components/ui/input'
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue
// } from '@/components/ui/select'
// import { useDocumentTypes } from '@/modules/admision'
// import { AuthLayout } from '@/modules/auth'
// import { IUserCreate } from '@/types'
// import { Eye, EyeOff, Loader, Search } from 'lucide-react'
// import Link from 'next/link'
// import { useRouter } from 'next/navigation'
// import { useEffect, useState } from 'react'
// import { toast } from 'react-toastify'
// import { AlertCustom, ConfirmationModal, ToastCustom } from '../app'
// import { useAuthStore } from './useAuthStore'

// import {
//   Form,
//   FormControl,
//   FormDescription,
//   FormField,
//   FormItem,
//   FormLabel,
//   FormMessage
// } from '@/components/ui/form'
// import { Label } from '@/components/ui/label'
// import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
// import { ADMISSION_URLS_APP } from '@/config/urls-data/admission.urls.config'
// import { RegisterFormValues, registerSchema } from '@/modules/auth'
// import { zodResolver } from '@hookform/resolvers/zod'
// import { useForm } from 'react-hook-form'
// import {
//   Tooltip,
//   TooltipContent,
//   TooltipProvider,
//   TooltipTrigger
// } from '../ui/tooltip'
// import { InputPassword } from './input-password'

// export const Register = () => {
//   const { documentTypes } = useDocumentTypes()
//   const [showConfirmPassword, setShowConfirmPassword] = useState(false)
//   const [accepted, setAccepted] = useState(false)
//   const [loading, setLoading] = useState(false)
//   const [loadingDocument, setLoadingDocument] = useState(false)
//   const [userExists, setUserExists] = useState(false)

//   const [searchMode, setSearchMode] = useState<'automatic' | 'manual'>(
//     'automatic'
//   )
//   const [isAlertOpen, setIsAlertOpen] = useState(false)

//   const handleModeChange = (value: 'automatic' | 'manual') => {
//     setSearchMode(value)
//   }

//   const { email } = useAuthStore()
//   const router = useRouter()

//   const form = useForm<RegisterFormValues>({
//     resolver: zodResolver(registerSchema),
//     defaultValues: {
//       documentType: documentTypes[0]?.id || 1,
//       documentNumber: '',
//       nombres: '',
//       primerApellido: '',
//       segundoApellido: '',
//       password: '',
//       confirmPassword: ''
//     }
//   })

//   const onSubmit = async (data: RegisterFormValues) => {
//     setLoading(true)
//     const userData: IUserCreate = {
//       document_number: data.documentNumber,
//       document_type: data.documentType,
//       email: email || '',
//       last_name1: data.primerApellido,
//       last_name2: data.segundoApellido || '',
//       names: data.nombres,
//       password: data.password,
//       confirmPassword: data.confirmPassword
//     }

//     try {
//       const response = await createAccount(userData)
//       if (response.status === 201) {
//         toast.success(
//           <ToastCustom
//             title="Registro exitoso"
//             description={`Se ha sido registrado correctamente.`}
//           />
//         )
//         router.push('/login')
//       } else {
//         toast.error(
//           <ToastCustom
//             title="Error al registrar"
//             description={`Error: ${response.errors?.join(', ')}`}
//           />
//         )
//       }
//     } catch (error) {
//       const errorResponse = (await error) as unknown as { errors: string[] }
//       toast.error(
//         <ToastCustom
//           title="Error al registrar"
//           description={`Error: ${errorResponse.errors.join(', ')}`}
//         />
//       )
//     }
//     setLoading(false)
//   }

//   async function getPersonInfoByDocument(document: string) {
//     if (!document) return

//     if (document.length < 8) {
//       toast.error(
//         <ToastCustom
//           title="Error"
//           description="El número de documento debe tener al menos 8 dígitos."
//         />
//       )
//       return
//     }

//     setLoadingDocument(true)
//     setUserExists(false)

//     if (searchMode !== 'manual') {
//       setSearchMode('automatic')
//     }

//     try {
//       const userResponse = await getUserPerson({ document_number: document })

//       if (
//         userResponse?.status === 200 &&
//         (userResponse?.data?.length ?? 0) > 0
//       ) {
//         const person = userResponse?.data?.[0]?.person
//         if (person) {
//           form.setValue('nombres', person.names)
//           form.setValue('primerApellido', person.last_name1)
//           form.setValue('segundoApellido', person.last_name2 || '')
//         }

//         if (userResponse.data && userResponse.data[0].user) {
//           toast.error(
//             <ToastCustom
//               title="Error"
//               description={`Ya existe una cuenta registrada de ${person?.full_name}.`}
//             />
//           )
//           setUserExists(true)
//         } else {
//           toast.success(
//             <ToastCustom
//               title="Persona encontrada"
//               description={`Se ha encontrado a ${person?.full_name}.`}
//             />
//           )
//         }
//       } else {
//         const documentResponse = await fetchDocument(document)

//         if (documentResponse?.estado === true) {
//           form.setValue('nombres', documentResponse.resultado.nombres)
//           form.setValue(
//             'primerApellido',
//             documentResponse.resultado.apellido_paterno
//           )
//           form.setValue(
//             'segundoApellido',
//             documentResponse.resultado.apellido_materno || ''
//           )
//           toast.success(
//             <ToastCustom
//               title="Persona encontrada"
//               description={`Se ha encontrado a ${documentResponse.resultado.nombre_completo}.`}
//             />
//           )
//         } else {
//           toast.error(
//             <ToastCustom
//               title="Error"
//               description="No se encontró ninguna persona con este documento. Puede intentar con otro tipo de documento o ingresar sus datos manualmente."
//             />
//           )
//         }
//       }
//     } catch (error) {
//       toast.error(
//         <ToastCustom
//           title="Error"
//           description={`Ocurrió un error al consultar los datos. Intente nuevamente. ${error}`}
//         />
//       )
//     } finally {
//       setLoadingDocument(false)
//     }
//   }

//   useEffect(() => {
//     if (email === null) {
//       router.push('/login')
//     }
//   }, [email])

//   useEffect(() => {
//     if (searchMode === 'manual') {
//       setIsAlertOpen(true)
//     }
//   }, [searchMode])

//   useEffect(() => {
//     const handleBeforeUnload = (event: BeforeUnloadEvent) => {
//       const message = '⚠️ Si recargas la página, todo el avance se perderá.'
//       event.preventDefault()
//       event.returnValue = message
//       return message
//     }

//     window.addEventListener('beforeunload', handleBeforeUnload)
//     return () => {
//       window.removeEventListener('beforeunload', handleBeforeUnload)
//     }
//   }, [])

//   return (
//     <AuthLayout>
//       <header className="space-y-2">
//         <h2 className="text-2xl font-bold">Crear cuenta</h2>
//         <p className="text-sm text-gray-600">
//           ¿Ya tienes cuenta?{' '}
//           <Link href="/login" className="text-blue-600 hover:underline">
//             Iniciar sesión
//           </Link>
//         </p>
//       </header>

//       {userExists && (
//         <AlertCustom type="error" title="Usuario ya existente" showIcon>
//           <p>
//             Ya existe una cuenta registrada con los datos ingresados. Por favor
//             inicia sesión.
//           </p>
//         </AlertCustom>
//       )}

//       <Form {...form}>
//         <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
//           <div className="space-y-4">
//             <FormField
//               control={form.control}
//               name="documentType"
//               render={({ field }) => (
//                 <FormItem>
//                   <FormLabel>Tipo de documento</FormLabel>
//                   <Select
//                     onValueChange={(value) => {
//                       const newValue = Number(value)
//                       field.onChange(newValue)

//                       if (newValue === 1) {
//                         setSearchMode('automatic')
//                       } else {
//                         // Todos los otros tipos de documento son manuales, los campos deben estar habilitados
//                         setSearchMode('manual')
//                       }
//                     }}
//                     defaultValue={field.value.toString()}
//                   >
//                     <FormControl>
//                       <SelectTrigger>
//                         <SelectValue placeholder="Seleccionar tipo de documento" />
//                       </SelectTrigger>
//                     </FormControl>
//                     <SelectContent>
//                       {documentTypes.map((type) => (
//                         <SelectItem key={type.id} value={type.id.toString()}>
//                           {type.abbreviation}
//                         </SelectItem>
//                       ))}
//                     </SelectContent>
//                   </Select>
//                   <FormMessage />
//                 </FormItem>
//               )}
//             />

//             {documentTypes.find(
//               (type) => type.id === form.watch('documentType')
//             )?.id === 1 && (
//               <section className="flex items-center space-x-2">
//                 <RadioGroup
//                   value={searchMode}
//                   onValueChange={handleModeChange}
//                   className="flex gap-4"
//                 >
//                   <div className="flex items-center space-x-2">
//                     <RadioGroupItem value="automatic" id="automatic" />
//                     <Label htmlFor="automatic">Búscar automanticamente</Label>
//                   </div>

//                   <div className="flex items-center space-x-2">
//                     <RadioGroupItem value="manual" id="manual" />
//                     <Label htmlFor="manual">Ingreso manual</Label>
//                   </div>
//                 </RadioGroup>
//               </section>
//             )}

//             <section className="flex items-center justify-centar space-x-2">
//               <div className="w-full">
//                 <FormField
//                   control={form.control}
//                   name="documentNumber"
//                   render={({ field }) => (
//                     <FormItem>
//                       <FormLabel>N° de documento</FormLabel>
//                       <FormControl>
//                         <Input
//                           {...field}
//                           type="search"
//                           onChange={(e) => {
//                             field.onChange(e.target.value)
//                             // setInputsDisabled(false);
//                             if (e.target.value === '') {
//                               form.setValue('nombres', '')
//                               form.setValue('primerApellido', '')
//                               form.setValue('segundoApellido', '')
//                               setUserExists(false)
//                             }
//                           }}
//                         />
//                       </FormControl>
//                       <FormDescription>
//                         Consultar tu número de DNI desde RENIEC.
//                       </FormDescription>
//                       <FormMessage />
//                     </FormItem>
//                   )}
//                 />
//               </div>
//               <div className="mt-1">
//                 {form.watch('documentType') === 1 &&
//                   searchMode === 'automatic' && (
//                     <TooltipProvider delayDuration={0}>
//                       <Tooltip>
//                         <TooltipTrigger asChild>
//                           <Button
//                             variant="secondary"
//                             size="icon"
//                             type="button"
//                             onClick={() =>
//                               getPersonInfoByDocument(
//                                 form.watch('documentNumber')
//                               )
//                             }
//                             disabled={
//                               loadingDocument || !form.watch('documentNumber')
//                             }
//                           >
//                             {loadingDocument ? (
//                               <Loader size={16} className="animate-spin" />
//                             ) : (
//                               <Search size={16} />
//                             )}
//                           </Button>
//                         </TooltipTrigger>
//                         <TooltipContent className="dark">
//                           <p>Consultar tu número de DNI desde la RENIEC </p>
//                         </TooltipContent>
//                       </Tooltip>
//                     </TooltipProvider>
//                   )}
//               </div>
//             </section>

//             <FormField
//               control={form.control}
//               name="nombres"
//               render={({ field }) => (
//                 <FormItem>
//                   <FormLabel>Nombres</FormLabel>
//                   <FormControl>
//                     <Input
//                       {...field}
//                       readOnly={searchMode === 'automatic'}
//                       disabled={searchMode === 'automatic'}
//                       onChange={(e) => {
//                         if (searchMode !== 'automatic') {
//                           field.onChange(e.target.value)
//                         }
//                       }}
//                     />
//                   </FormControl>
//                   <FormMessage />
//                 </FormItem>
//               )}
//             />

//             <div className="grid grid-cols-2 gap-4">
//               <FormField
//                 control={form.control}
//                 name="primerApellido"
//                 render={({ field }) => (
//                   <FormItem>
//                     <FormLabel>Primer apellido</FormLabel>
//                     <FormControl>
//                       <Input
//                         {...field}
//                         readOnly={searchMode === 'automatic'}
//                         disabled={searchMode === 'automatic'}
//                         onChange={(e) => {
//                           if (searchMode !== 'automatic') {
//                             field.onChange(e.target.value)
//                           }
//                         }}
//                       />
//                     </FormControl>
//                     <FormMessage />
//                   </FormItem>
//                 )}
//               />
//               <FormField
//                 control={form.control}
//                 name="segundoApellido"
//                 render={({ field }) => (
//                   <FormItem>
//                     <FormLabel>Segundo apellido</FormLabel>
//                     <FormControl>
//                       <Input
//                         {...field}
//                         readOnly={searchMode === 'automatic'}
//                         disabled={searchMode === 'automatic'}
//                         onChange={(e) => {
//                           if (searchMode !== 'automatic') {
//                             field.onChange(e.target.value)
//                           }
//                         }}
//                       />
//                     </FormControl>
//                     <FormMessage />
//                   </FormItem>
//                 )}
//               />
//             </div>
//           </div>
//           {!userExists && (
//             <>
//               <FormField
//                 control={form.control}
//                 name="password"
//                 render={({ field }) => (
//                   <FormItem>
//                     <FormLabel>Contraseña con indicador de fortaleza</FormLabel>
//                     <FormControl>
//                       <InputPassword {...field} />
//                     </FormControl>
//                     <FormMessage />
//                   </FormItem>
//                 )}
//               />

//               <FormField
//                 control={form.control}
//                 name="confirmPassword"
//                 render={({ field }) => (
//                   <FormItem>
//                     <FormLabel>Confirmar contraseña</FormLabel>
//                     <FormControl>
//                       <div className="relative">
//                         <Input
//                           {...field}
//                           type={showConfirmPassword ? 'text' : 'password'}
//                           placeholder="Confirmar contraseña"
//                         />
//                         <Button
//                           type="button"
//                           variant="ghost"
//                           size="icon"
//                           className="absolute right-2 top-1/2 -translate-y-1/2"
//                           onClick={() =>
//                             setShowConfirmPassword(!showConfirmPassword)
//                           }
//                         >
//                           {showConfirmPassword ? (
//                             <EyeOff className="h-4 w-4" />
//                           ) : (
//                             <Eye className="h-4 w-4" />
//                           )}
//                         </Button>
//                       </div>
//                     </FormControl>
//                     <FormMessage />
//                   </FormItem>
//                 )}
//               />
//               <div className="flex items-start space-x-2">
//                 <Checkbox
//                   id="terms"
//                   checked={accepted}
//                   onCheckedChange={(checked) => setAccepted(checked as boolean)}
//                   required
//                 />
//                 <Label htmlFor="terms" className="text-sm leading-none">
//                   Acepto las{' '}
//                   <Link
//                     href={ADMISSION_URLS_APP.HOME.TERMS_AND_CONDITIONS}
//                     target="_blank"
//                     className="text-blue-600 hover:underline"
//                   >
//                     Condiciones de servicio
//                   </Link>{' '}
//                   y la{' '}
//                   <Link
//                     href={ADMISSION_URLS_APP.HOME.PRIVACY_POLICY}
//                     target="_blank"
//                     className="text-blue-600 hover:underline"
//                   >
//                     política de privacidad
//                   </Link>{' '}
//                   de EPG - UNAP
//                 </Label>
//               </div>

//               <Button
//                 type="submit"
//                 className="w-full bg-[#001B3D]"
//                 disabled={!accepted || loading}
//               >
//                 Crear cuenta
//                 {loading && <Loader className="ml-2 animate-spin" />}
//               </Button>
//             </>
//           )}
//         </form>
//       </Form>
//       {userExists && (
//         <footer className="w-full">
//           <Button
//             type="button"
//             onClick={() => {
//               form.setValue('documentNumber', '')
//               form.setValue('nombres', '')
//               form.setValue('primerApellido', '')
//               form.setValue('segundoApellido', '')
//               setUserExists(false)
//             }}
//             variant="ghost"
//             className="w-full border"
//           >
//             Consultar otro documento
//           </Button>
//         </footer>
//       )}

//       <ConfirmationModal
//         open={isAlertOpen}
//         onOpenChange={setIsAlertOpen}
//         title="ACCIÓN NO RECOMENDADA"
//         description="Está ingresando datos manualmente. Esta acción no es recomendada. La información ingresada tiene carácter de declaración jurada y debe coincidir con su documento de identidad."
//         handleConfirm={() => {
//           setIsAlertOpen(false)
//         }}
//         handleCancel={() => {
//           setIsAlertOpen(false)
//           setSearchMode('automatic')
//           // setInputsDisabled(true);
//         }}
//       />
//     </AuthLayout>
//   )
// }
