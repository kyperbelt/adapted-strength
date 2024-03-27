package com.terabite.user.model;

import com.fasterxml.jackson.annotation.JsonAlias;
import com.terabite.payment.model.Customer;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;
import org.springframework.format.annotation.DateTimeFormat;

import java.io.Serializable;
import java.time.LocalDate;
import java.util.Date;

@Entity
@Table(name = "user_information_table")
public class UserInformation implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long id;

    @NotBlank
    @JsonAlias("first_name")
    private String firstName;

    @NotBlank
    @JsonAlias("last_name")
    private String lastName;

    @JsonAlias("subscriptionTier")
    private SubscriptionStatus subscriptionTier = SubscriptionStatus.NO_SUBSCRIPTION;

    @JsonAlias("expiration_date")
    @DateTimeFormat(pattern = "yyyy-MM-dd")
    private LocalDate expirationDate;

    @NotNull
    @JsonAlias("date_of_birth")
    @Column(columnDefinition = "date")
    @DateTimeFormat(pattern = "yyyy-MM-dd")
    @Temporal(TemporalType.DATE)
    private Date dateOfBirth;

    @Pattern(regexp = "^[MF]$")
    @Column(columnDefinition = "char")
    private String sex;

    @JsonAlias("shirt_size")
    @Pattern(regexp = "^[2-5]*[LMSX]+$")
    private String shirtSize;

    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "address_id", referencedColumnName = "id")
    private Address address;

    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "customer_id", referencedColumnName = "id")
    private Customer customer;

    @JsonAlias("cell_phone")
    @Pattern(regexp = "^[0-9]{10}$")
    private String cellPhone;

    @JsonAlias("home_phone")
    @Pattern(regexp = "^[0-9]{10}$")
    private String homePhone;

    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "emergency_contact_id", referencedColumnName = "id")
    @JsonAlias("emergency_contact")
    private EmergencyContact emergencyContact;

    @JsonAlias("email")
    @Column(unique = true)
    @Pattern(regexp = "^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$")
    private String email;

    @JsonAlias("how_did_you_hear")
    private String howDidYouHear;

    public long getId() {
        return id;
    }

    public void setId(long userId) {
        this.id = userId;
    }

    public String getFirstName() {
        return firstName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public String getLastName() {
        return lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public void setSubscriptionTier(SubscriptionStatus subscriptionTier) { this.subscriptionTier = subscriptionTier; }

    public SubscriptionStatus getSubscriptionTier() { return subscriptionTier; }

    public LocalDate getExpirationDate() {return expirationDate; }

    // Set subscription expiration date to be 30 days from the current date
    public void setExpirationDate() {this.expirationDate = LocalDate.now().plusDays(30); }
    public void cancelExpirationDate() {this.expirationDate = null; }

    public Date getDateOfBirth() {
        return dateOfBirth;
    }

    public void setDateOfBirth(Date dateOfBirth) {
        this.dateOfBirth = dateOfBirth;
    }

    public String getSex() {
        return sex;
    }

    public void setSex(String sex) {
        this.sex = sex;
    }

    public String getShirtSize() {
        return shirtSize;
    }

    public void setShirtSize(String shirtSize) {
        this.shirtSize = shirtSize;
    }

    public Address getAddress() {
        return address;
    }

    public void setAddress(Address address) {
        this.address = address;
    }

    public String getCellPhone() {
        return cellPhone;
    }

    public void setCellPhone(String cellPhone) {
        this.cellPhone = cellPhone;
    }

    public String getHomePhone() {
        return homePhone;
    }

    public void setHomePhone(String homePhone) {
        this.homePhone = homePhone;
    }

    public EmergencyContact getEmergencyContact() {
        return emergencyContact;
    }

    public void setEmergencyContact(EmergencyContact emergencyContact) {
        this.emergencyContact = emergencyContact;
    }

    public String getHowDidYouHear() {
        return howDidYouHear;
    }

    public void setHowDidYouHear(String howDidYouHear) {
        this.howDidYouHear = howDidYouHear;
    }

    public void setEmail(String string) {
        this.email = string;
    }

    public String getEmail() {
        return email;
    }

    public Customer getCustomer() {
        return customer;
    }

    public void setCustomer(Customer customer) {
        this.customer = customer;
    }
}
