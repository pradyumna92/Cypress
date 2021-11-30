class login{

    website(){
        return  cy.visit("http://demo.guru99.com/test/newtours/index.php")
    }

    userName(){
        return cy.xpath("//input[@name='userName']")
         
    }

    password(){
        return  cy.xpath("//input[@name='password']")
    }

    signIn(){
        return cy.xpath("//input[@name='submit']")
    }
}

export default login