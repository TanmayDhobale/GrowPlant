"use client"
import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
  } from "@/components/ui/tabs"
  
  import { Button } from "@/components/ui/button"
  import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card"
  import { Input } from "@/components/ui/input"
  import { Label } from "@/components/ui/label"
  import axios from "axios"
  import { useEffect, useState } from "react"
import { useRecoilState } from "recoil"
import { UserEmail, UserName, userAuth } from "./atoms/userAuth"
import { useToast } from "@/components/ui/use-toast"
import { getCookie } from "cookies-next"
import { useRouter } from "next/navigation"
import Loading from "@/app/loading"

  export  function TabsTable() {   
    const url = 'http://localhost:3000'
    const [ userLogin, setUserLogin ] = useRecoilState(userAuth)
    const { toast } = useToast() 
    const navigate = useRouter()
    const [ userEmail, setUserEmail ]=useRecoilState(UserEmail)

    const loginapi = async ()=>{
        try {
          const { data  } = await axios.post(`${url}/api/signin`,
            {email:Email,password:Password}
            )
            if(!data){
              <Loading/>
            }
          if(data.user.success){
            setUserLogin(true)
            toast({ 
              description: "Successfully signed in!",
              variant:"custom"
            })          
            navigate.push('/')
          } 
        } catch (error) {
         error && console.log(error)
         toast({
          variant: "destructive",
          description: `${error.response.data.message}`,
        })
        }
      }
    const signupapi = async ()=>{
        try {
          const { data  } = await axios.post(`${url}/api/signup`,
            {email:Email,password:Password}
          )
          if(!data){
            <Loading/>
          }
          if(data.user.success){
            setUserLogin(true)
            toast({ 
              description: "Account created successfully!",
              variant:"custom"
            })
            navigate.push('/')
          }       
          if(data.success){
            navigate.push('/')
            toast({          
              description: "Account created successfully!",
              variant:"custom"
            })
          }
        } catch (error) {
         error && console.log(error)
         toast({
          variant: "destructive",
          description: `${error.response.data.message}`,
        })
        }
    
      }  
    const [Email, setEmail] = useState('')
    const [Password, setPassword] = useState('')
    
      useEffect(()=>{
      },[userLogin])
  return (

    <Tabs defaultValue="account" className="w-[400px] p-4 border-solid border-primary rounded-md border-2  text-primary  ">
      <TabsList className="grid w-full grid-cols-2 " >
        <TabsTrigger value="account" >Sign In</TabsTrigger>
        <TabsTrigger value="password">Sign Up</TabsTrigger>  
      </TabsList>
      <TabsContent className='border-none ' value="account" >
      <form action={loginapi}>
        <Card className='bg-card' > 
          <CardHeader>
            <CardTitle>Sign In </CardTitle>  
          </CardHeader>
          <CardContent className="space-y-2 ">
            <div className="space-y-1">
              <Label htmlFor="name">Email</Label>
              <Input id="name"
               value={Email}
               required={true} placeholder='Enter email'
               onChange={(e)=>setEmail(e.target.value)}
               />
               
            </div>
            <div className="space-y-1">
              <Label htmlFor="username" >Password</Label>
              <Input id="username" 
              value={Password} type='password' required={true}
               placeholder='Enter password'
               onChange={(e)=>setPassword(e.target.value)}            
               
               />
            </div>
          </CardContent>
          <CardFooter>
          <Button             
              type={'submit'}
              variant="secondary" 
              className="text-white-foreground bg-primary hover:bg-green-400 "
              >
              Sign In</Button>
          </CardFooter>
        </Card>
      </form>
      </TabsContent>
      <TabsContent value="password">
        <Card  className='bg-card'  >
          <CardHeader>
            <CardTitle>Sign Up</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="space-y-1">
              <Label htmlFor="Enter email"> Email</Label>
              <Input id="current"
               required={true} type="email"
                placeholder='Enter email' 
               value={Email}
               onChange={(e)=>setEmail(e.target.value)}
                />
            </div>
            <div className="space-y-1">
              <Label htmlFor="Enter password" > Password</Label>
              <Input id="new" required={true} 
              type="password" placeholder='Enter password'
              value={Password}
              onChange={(e)=>setPassword(e.target.value)}            
              
              />
            </div>
          </CardContent>
          <CardFooter>
          <Button
              type={'submit'}
              onClick={signupapi}
              variant="secondary"
              className="text-white-foreground bg-primary hover:bg-green-400  "             
              >
              Sign up</Button>
          </CardFooter>
        </Card>
      </TabsContent>
    </Tabs>
  )
}
