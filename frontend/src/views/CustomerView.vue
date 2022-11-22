<template>
    <div class="" @dblclick="activeIndex = -1">
        <div class="flex flex-row justify-between items-start w-full">
            <div class="bg-white w-auto my-2 mr-2 flex items-start rounded-md">
                <img src="https://cdn.pixabay.com/photo/2022/05/15/13/38/woman-7198072__340.jpg" alt=""
                    class="w-40 rounded-md m-2">
                <div class="flex flex-col m-2">
                    <span>{{ customer.name }}</span>
                    <span class="lowercase text-slate-700">{{ customer.email }}</span>
                    <div class="flex flex-row mt-4">
                        <button
                            class="flex items-center py-2 px-3 rounded-lg text-white bg-sky-500 hover:bg-sky-700 shadow-lg shadow-sky-500/50 mr-4">
                            <i class="bi bi-pencil-square mr-2"></i>
                            <span class="">Edit</span>
                            <slot></slot>
                        </button>
                        <button
                            class="flex items-center py-2 px-3 rounded-lg text-white bg-red-500 hover:bg-red-700 shadow-lg shadow-red-500/50">
                            <i class="bi bi-trash mr-2"></i>
                            <span class="">Delete</span>
                            <slot></slot>
                        </button>
                    </div>
                </div>
                <div
                    class="flex flex-row ml-5 pl-5 mt-2 border border-solid border-sky-200 border-t-0 border-b-0 border-r-0">
                    <div class="flex flex-col text-lg text-slate-900">
                        <span>Gender</span>
                        <span>Contact</span>

                    </div>
                    <div
                        class="flex flex-col ml-5 pl-5 mr-2 lowercase text-slate-600 text-lg border border-solid border-sky-100 border-t-0 border-b-0 border-r-0">
                        <span>{{ customer.gender ? 'male' : 'female' }}</span>
                        <span>{{ customer.phone }}</span>
                    </div>
                </div>
            </div>
            <div class="bg-white w-auto my-2 ml-2 flex-1 rounded-md border border-solid border-sky-200 border-1">
                <div
                    class="flex m-2 justify-center text-slate-900 text-lg border border-solid border-1 border-t-0 border-l-0 border-r-0 border-sky-200">
                    <span class="float-left mr-5 uppercase text-blue-800">total of medical examination slips -</span>
                    <span class="float-right mb-2 text-blue-800">{{ totalVouchers }}</span>
                </div>
                <div class="flex flex-row m-2 items-center text-slate-800"
                    v-for="(value, index) in customer.examVoucher" :key="index">
                    <span class="text-md">{{ value.stt }}</span>
                    <span class="text-xs ml-5">{{ value.expression }}</span>
                </div>
            </div>
        </div>
        <!-- exam voucher -->
        <div class="bg-white rounded-md" @dblclick="activeAction = !activeAction">
            <div class="flex flex-row justify-between m-2 py-2 items-center">
                <span class="uppercase text-blue-800 text-xl">List of medical examination slips</span>
                <Button @click="activeAdd = true">
                    <i class="bi bi-plus-lg mr-2 text-sm"></i>
                    <span>Add Exam Voucher</span>
                </Button>
            </div>
            <table class="border-collapse table-fixed bg-white w-full">
                <thead>
                    <tr class="bg__light text-slate-900 text-base uppercase border border-solid border-l-0 border-r-0 border-slate-500">
                        <th
                            class="py-2 pl-2 pr-2 relative text-xl w-20">
                            <span class="float-left">#</span>
                        </th>
                        <th class=" py-2 pl-2 pr-2 relative"
                            v-for="(field, index) in fields" :key="index">
                            <span class="float-left">
                                {{ field }}
                            </span>
                            <Sort />
                        </th>
                        <th
                            class=" py-2 pl-2 pr-2 relative w-28">
                            <span class="float-left">
                                Actions
                            </span>
                        </th>
                    </tr>
                </thead>
                <tbody>
                    <tr class="text-slate-700 text-lg lowercase border border-solid border-l-0 border-r-0 border-slate-300 p-2" v-for="(item, index) in customer.examVoucher"
                        :key="item._id">
                        <td
                            class="p-2 relative cursor-pointer text-sky-500">
                            <span>#{{ sliceID(item._id, index) }}</span>
                        </td>
                        <td class="p-2">
                            {{ item.stt }}
                        </td>
                        <td class=" p-2">
                            {{ item.expression }}
                        </td>
                        <td class=" p-2">
                            {{ getIdSchedule(item.scheduleWork) }}{{ dateExam }}
                        </td>
                        <td class=" p-2">
                            {{ dentistExam }}
                        </td>
                        <td>
                        <td
                            class="p-2 relative cursor-pointer mr-14">
                            <i class="bi bi-three-dots-vertical" @click="activeIndex = index"></i>
                            <div class="absolute bg-white mt-2 left-0 mr-5 block shadow-md text-base z-10"
                                v-if="index === activeIndex">
                                <div class="flex flex-row items-center px-5 py-2 text-sky-700 hover:text-white hover:bg-sky-500">
                                    <i class="bi bi-file-text mr-2"></i>
                                    <span>Details</span>
                                </div>
                                <div class="flex flex-row items-center px-5 py-2 text-sky-700 hover:text-white hover:bg-sky-500">
                                    <i class="bi bi-pencil-square mr-2"></i>
                                    <span>Edit</span>
                                </div>
                                <div @click="deleteItem(item._id)"
                                    class="flex flex-row items-center px-5 py-2 text-sky-700 hover:text-white hover:bg-sky-500">
                                    <i class="bi bi-trash mr-2"></i>
                                    <span>Delete</span>
                                </div>
                            </div>
                        </td>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>

<script>
import Customer from "../services/customer.service";
import ScheduleWork from "../services/schedule-work.service";
import Table from "../components/Table.vue";
import Button from "../components/Button.vue";
import Search from "../components/Search.vue";
export default {
    components: {
        Table,
        Button,
        Search
    },
    props: {
        id: {
            type: String, required: true,
        }
    },
    data() {
        return {
            customer: {},
            scheduleWork: {},
            totalVouchers: 0,
            searchText: "",
            examVouchers: [],
            activeAction: -1,
            idDeleteItem: "",
            activeAdd: false,
            newVoucher: {},
            fields: ['stt', 'expression', 'date', 'dentist'],
            idSchedule: "",
            dateExam: "",
            dentistExam: "",
            activeIndex: -1,
        }
    },
    watch: {
        idSchedule() {
            this.getScheduleWork(this.idSchedule);
        }
    },
    computed: {

    },
    methods: {
        // get info of patient card (customer)
        async getInfo(id) {
            try {
                this.customer = await Customer.get(id);
                this.totalVouchers = this.customer.examVoucher.length;
            } catch (err) {
                console.log(err);
            }
        },
        // format ID
        sliceID(id, index) {
            return id.substring(18, 22).concat(index);
        },
        // get ID need show info
        getIdSchedule(id) {
            this.idSchedule = id;
        },
        // get info schedule work
        async getScheduleWork(id) {
            try {
                this.scheduleWork = await ScheduleWork.get(id);
                this.dentistExam = this.scheduleWork.employee.name;
                this.dateExam = this.formatDate(this.scheduleWork.date.date);
            } catch (err) {
                console.log(err);
            }
        },
        // format date
        formatDate(date) {
            const d = new Date(date).getDate();
            const m = new Date(date).getMonth();
            const y = new Date(date).getFullYear();
            return `${d}-${m}-${y}`;
        }
    },
    created() {
        this.getInfo(this.id);
    },
    mounted() {
        // this.getScheduleWork(this.idSchedule);
    }
}
</script>