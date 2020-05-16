<template>
    <v-container>
        <v-data-table
                :headers="headers"
                :items="users"
                sort-by="calories"
                class="elevation-1"
                :search="search"
                item-key="name"
                :items-per-page="5"
                :multi-sort="false"
        >
            <template v-slot:top>
                <v-toolbar flat color="white">
                    <v-toolbar-title>Users</v-toolbar-title>
                    <v-divider
                            class="mx-6"
                            inset
                            vertical
                    ></v-divider>
                    <v-text-field
                            v-model="search"
                            append-icon="mdi-magnify"
                            label="Search"
                            single-line
                            hide-details
                    ></v-text-field>
                    <v-spacer></v-spacer>
                    <v-dialog v-model="dialog" max-width="500px">
                        <template v-slot:activator="{ on }">
                            <v-btn color="primary" dark class="mb-2" v-on="on">New User</v-btn>
                        </template>
                        <v-card>
                            <v-card-title>
                                <span class="headline">{{ formTitle }}</span>
                            </v-card-title>

                            <v-card-text>
                                <v-container>
                                    <v-row>
                                        <v-col>
                                            <v-form ref="addUserForm" v-model="formValidity">
                                                <v-text-field v-model="editedItem.name" label="User Full Name"></v-text-field>
                                                <v-text-field
                                                        v-model="editedItem.username"
                                                        label="Username"
                                                        required>
                                                </v-text-field>
                                                <v-text-field
                                                        v-model="editedItem.email"
                                                        label="Email"
                                                        type="email"
                                                        required
                                                        :rules="emailRules">
                                                </v-text-field>
                                                <v-text-field v-model="editedItem.address.street" label="Street"></v-text-field>
                                                <v-text-field v-model="editedItem.address.suite" label="Suite"></v-text-field>
                                                <v-text-field v-model="editedItem.address.city" label="City"></v-text-field>
                                                <v-text-field v-model="editedItem.address.zipcode" label="Zipcode"></v-text-field>

                                                <v-spacer></v-spacer>
                                                <v-btn color="blue darken-1" text @click="close">Cancel</v-btn>
                                                <v-btn color="blue darken-1"
                                                       :disabled="!formValidity"
                                                       text
                                                       @click="save">
                                                    Save
                                                </v-btn>
                                            </v-form>
                                        </v-col>
                                    </v-row>
                                </v-container>
                            </v-card-text>
                        </v-card>
                    </v-dialog>
                </v-toolbar>
            </template>
            <template v-slot:item.actions="{ item }">
                <v-icon
                        small
                        class="mr-2"
                        @click="editItem(item)"
                >
                    mdi-pencil
                </v-icon>
                <v-icon
                        small
                        @click="deleteItem(item)"
                >
                    mdi-delete
                </v-icon>
            </template>
        </v-data-table>
    </v-container>
</template>

<script>
    export default {
        name: 'UsersTable',
        props: {
            users: {
                type: Array,
                required: true
            }
        },
        data: () => ({
            dialog: false,
            search: '',
            headers: [
                { text: 'User ID', value: 'id' },
                { text: 'Name', value: 'name' },
                { text: 'Login', value: 'username' },
                { text: 'Email', value: 'email' },
                { text: 'Address', value: 'address.street' },
                { text: 'Actions', value: 'actions', sortable: false }
            ],
            editedIndex: -1,
            editedItem: {
                name: '',
                username: '',
                email: '',
                address: ''
            },
            defaultItem: {
                name: '',
                username: '',
                email: '',
                address: ''
            },
            emailRules: [
                value => value.indexOf('@') !== 0 || 'Email should have a username.',
                value => value.includes('@') || 'Email should include an @ symbol.',
                value =>
                    value.indexOf('.') - value.indexOf('@') > 1 ||
                    'Email should contain a valid domain.',
                value => value.includes('.') || 'Email should include a period symbol.',
                value =>
                    value.indexOf('.') <= value.length - 3 ||
                    'Email should contain a valid domain extension.'
            ],
            formValidity: false
        }),
        computed: {
            formTitle () {
                return this.editedIndex === -1 ? 'New User' : 'Edit User'
            }
        },
        watch: {
            dialog (val) {
                val || this.close()
            },
        },
        methods: {
            editItem (item) {
                this.editedIndex = this.users.indexOf(item)
                this.editedItem = Object.assign({}, item)
                this.dialog = true
            },
            deleteItem (item) {
                const index = this.users.indexOf(item)
                confirm('Are you sure you want to delete this user?') && this.users.splice(index, 1)
            },
            close () {
                this.dialog = false
                this.$nextTick(() => {
                    this.editedItem = Object.assign({}, this.defaultItem)
                    this.editedIndex = -1
                })
            },
            save () {
                if (this.editedIndex > -1) {
                    Object.assign(this.users[this.editedIndex], this.editedItem)
                } else {
                    this.users.push(this.editedItem)
                }
                this.close()
            }
        }
    }
</script>

<style lang="scss" scoped></style>